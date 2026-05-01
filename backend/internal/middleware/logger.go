package middleware

import (
	"bytes"
	"io"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type bodyLogWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (w bodyLogWriter) Write(b []byte) (int, error) {
	w.body.Write(b)
	return w.ResponseWriter.Write(b)
}

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		traceID := uuid.New().String()
		c.Set("trace_id", traceID)
		c.Header("X-Trace-ID", traceID)

		start := time.Now()

		// Read Request Body
		var requestBody []byte
		if c.Request.Body != nil {
			requestBody, _ = io.ReadAll(c.Request.Body)
			c.Request.Body = io.NopCloser(bytes.NewBuffer(requestBody))
		}

		// Capture Response Body
		blw := &bodyLogWriter{body: bytes.NewBufferString(""), ResponseWriter: c.Writer}
		c.Writer = blw

		c.Next()

		timeCost := time.Since(start)
		status := "Success"
		if c.Writer.Status() >= 400 {
			status = "Failed"
		}

		// Digest Log
		log.Printf("[DIGEST] TraceID: %s | Method: %s | Path: %s | Request: %s | Response: %s | Status: %s | TimeCost: %v",
			traceID,
			c.Request.Method,
			c.Request.URL.Path,
			string(requestBody),
			blw.body.String(),
			status,
			timeCost,
		)

		// Unknown Error Log
		if len(c.Errors) > 0 {
			for _, e := range c.Errors {
				log.Printf("[ERROR] TraceID: %s | Error: %v", traceID, e.Err)
			}
		}
	}
}
