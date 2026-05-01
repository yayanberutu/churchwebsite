package service

import (
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
)

// StorageService defines the interface for cloud file operations.
type StorageService interface {
	UploadFile(ctx context.Context, file multipart.File, header *multipart.FileHeader, folder string) (string, error)
	DeleteFile(ctx context.Context, fileURL string) error
}

type r2StorageService struct {
	client    *s3.Client
	bucket    string
	publicURL string
}

func getTraceID(ctx context.Context) string {
	if traceID, ok := ctx.Value("trace_id").(string); ok {
		return traceID
	}
	return "internal"
}

// NewStorageService creates a new Cloudflare R2-backed StorageService.
func NewStorageService() (StorageService, error) {
	accountID := os.Getenv("R2_ACCOUNT_ID")
	accessKey := os.Getenv("R2_ACCESS_KEY_ID")
	secretKey := os.Getenv("R2_SECRET_ACCESS_KEY")
	bucket := os.Getenv("R2_BUCKET_NAME")
	publicURL := os.Getenv("R2_PUBLIC_URL")

	if accountID == "" || accessKey == "" || secretKey == "" || bucket == "" {
		return nil, fmt.Errorf("missing required R2 environment variables")
	}

	r2Endpoint := fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountID)

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion("auto"),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to load R2 config: %w", err)
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.BaseEndpoint = aws.String(r2Endpoint)
		o.UsePathStyle = true
	})

	return &r2StorageService{
		client:    client,
		bucket:    bucket,
		publicURL: publicURL,
	}, nil
}

func (s *r2StorageService) UploadFile(ctx context.Context, file multipart.File, header *multipart.FileHeader, folder string) (string, error) {
	traceID := getTraceID(ctx)
	now := time.Now()
	ext := filepath.Ext(header.Filename)
	id := uuid.New().String()
	key := fmt.Sprintf("%s/%d/%02d/%s_%s%s", folder, now.Year(), now.Month(), folder, id, ext)

	contentType := header.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	log.Printf("[INTEGRATION] TraceID: %s | Action: R2_UPLOAD_START | Bucket: %s | Key: %s", traceID, s.bucket, key)
	start := time.Now()

	_, err := s.client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(key),
		Body:        file,
		ContentType: aws.String(contentType),
	})

	timeCost := time.Since(start)
	if err != nil {
		log.Printf("[INTEGRATION] TraceID: %s | Action: R2_UPLOAD_FAILED | Error: %v | TimeCost: %v", traceID, err, timeCost)
		return "", fmt.Errorf("failed to upload file to R2: %w", err)
	}

	log.Printf("[INTEGRATION] TraceID: %s | Action: R2_UPLOAD_SUCCESS | Key: %s | TimeCost: %v", traceID, key, timeCost)
	return fmt.Sprintf("%s/%s", strings.TrimRight(s.publicURL, "/"), key), nil
}

func (s *r2StorageService) DeleteFile(ctx context.Context, fileURL string) error {
	traceID := getTraceID(ctx)
	if fileURL == "" {
		return nil
	}

	prefix := strings.TrimRight(s.publicURL, "/") + "/"
	key := strings.TrimPrefix(fileURL, prefix)

	if key == fileURL {
		return nil
	}

	log.Printf("[INTEGRATION] TraceID: %s | Action: R2_DELETE_START | Bucket: %s | Key: %s", traceID, s.bucket, key)
	start := time.Now()

	_, err := s.client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(key),
	})

	timeCost := time.Since(start)
	if err != nil {
		log.Printf("[INTEGRATION] TraceID: %s | Action: R2_DELETE_FAILED | Error: %v | TimeCost: %v", traceID, err, timeCost)
		return fmt.Errorf("failed to delete file from R2: %w", err)
	}

	log.Printf("[INTEGRATION] TraceID: %s | Action: R2_DELETE_SUCCESS | Key: %s | TimeCost: %v", traceID, key, timeCost)
	return nil
}
