package service

import (
	"context"
	"errors"
	"io"
	"strconv"
	"time"

	"github.com/yayanberutu/churchwebsite/backend/internal/entity"
	"github.com/yayanberutu/churchwebsite/backend/internal/repository"
)

type PublicContentService interface {
	GetLatestWarta(ctx context.Context) (*entity.Warta, error)
	GetLatestAnnouncements(ctx context.Context, limit int) ([]entity.Announcement, error)
	GetAnnouncements(ctx context.Context, page, pageSize int) (*entity.PaginatedAnnouncements, error)
	GetAnnouncementByID(ctx context.Context, id int64) (*entity.Announcement, error)
	GetLatestMinistryActivities(ctx context.Context, limit int) ([]entity.MinistryActivity, error)
	GetMinistryActivities(ctx context.Context, page, pageSize int) (*entity.PaginatedMinistryActivities, error)
	GetMinistryActivityByID(ctx context.Context, id int64) (*entity.MinistryActivity, error)
	GetWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error)
	GetDailyVerse(ctx context.Context, date string) (*entity.DailyVerse, error)
	GetUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error)
	GetCalendarActivitiesByDate(ctx context.Context, date string) ([]entity.UpcomingActivity, error)
	GetCalendarActivityDates(ctx context.Context, month string) ([]string, error)
	ProxyAsset(ctx context.Context, key string) (io.ReadCloser, string, error)
}

type publicContentService struct {
	repo           repository.PublicContentRepository
	storageService StorageService
}

func NewPublicContentService(repo repository.PublicContentRepository, ss StorageService) PublicContentService {
	return &publicContentService{repo: repo, storageService: ss}
}

func (s *publicContentService) GetLatestWarta(ctx context.Context) (*entity.Warta, error) {
	warta, err := s.repo.GetLatestWarta()
	if err == nil && warta != nil && s.storageService != nil {
		warta.FileURL = s.storageService.RewriteURL(warta.FileURL)
	}
	return warta, err
}

func (s *publicContentService) GetLatestAnnouncements(ctx context.Context, limit int) ([]entity.Announcement, error) {
	if limit <= 0 {
		limit = 3
	}
	announcements, err := s.repo.GetLatestAnnouncements(limit)
	s.rewriteAnnouncementAttachmentURLs(announcements)
	return announcements, err
}

func (s *publicContentService) GetAnnouncements(ctx context.Context, page, pageSize int) (*entity.PaginatedAnnouncements, error) {
	page, pageSize = normalizePagination(page, pageSize, 10, 50)
	return s.repo.GetAnnouncements(page, pageSize)
}

func (s *publicContentService) GetAnnouncementByID(ctx context.Context, id int64) (*entity.Announcement, error) {
	announcement, err := s.repo.GetAnnouncementByID(id)
	if err == nil && announcement != nil && s.storageService != nil {
		for i := range announcement.Attachments {
			if announcement.Attachments[i].FileURL != "" {
				announcement.Attachments[i].FileURL = s.storageService.RewriteURL(announcement.Attachments[i].FileURL)
			}
		}
	}
	return announcement, err
}

func (s *publicContentService) rewriteAnnouncementAttachmentURLs(announcements []entity.Announcement) {
	if s.storageService == nil {
		return
	}
	for i := range announcements {
		for j := range announcements[i].Attachments {
			if announcements[i].Attachments[j].FileURL != "" {
				announcements[i].Attachments[j].FileURL = s.storageService.RewriteURL(announcements[i].Attachments[j].FileURL)
			}
		}
	}
}

func (s *publicContentService) GetLatestMinistryActivities(ctx context.Context, limit int) ([]entity.MinistryActivity, error) {
	if limit <= 0 {
		limit = 3
	}
	activities, err := s.repo.GetLatestMinistryActivities(limit)
	s.rewriteMinistryImageURLs(activities)
	return activities, err
}

func (s *publicContentService) GetMinistryActivities(ctx context.Context, page, pageSize int) (*entity.PaginatedMinistryActivities, error) {
	page, pageSize = normalizePagination(page, pageSize, 6, 30)
	result, err := s.repo.GetMinistryActivities(page, pageSize)
	if err == nil && result != nil {
		s.rewriteMinistryImageURLs(result.Items)
	}
	return result, err
}

func (s *publicContentService) GetMinistryActivityByID(ctx context.Context, id int64) (*entity.MinistryActivity, error) {
	activity, err := s.repo.GetMinistryActivityByID(id)
	if err == nil && activity != nil && s.storageService != nil && activity.ImageURL != "" {
		activity.ImageURL = s.storageService.RewriteURL(activity.ImageURL)
	}
	return activity, err
}

func (s *publicContentService) rewriteMinistryImageURLs(activities []entity.MinistryActivity) {
	if s.storageService == nil {
		return
	}
	for i := range activities {
		if activities[i].ImageURL != "" {
			activities[i].ImageURL = s.storageService.RewriteURL(activities[i].ImageURL)
		}
	}
}

func (s *publicContentService) GetWorshipSchedules(ctx context.Context) ([]entity.WorshipSchedule, error) {
	return s.repo.GetWorshipSchedules()
}

func (s *publicContentService) GetDailyVerse(ctx context.Context, date string) (*entity.DailyVerse, error) {
	if date == "" {
		date = time.Now().In(jakartaLocation()).Format("2006-01-02")
	}
	return s.repo.GetDailyVerseByDate(date)
}

func (s *publicContentService) GetUpcomingActivities(ctx context.Context) ([]entity.UpcomingActivity, error) {
	now := time.Now().In(jakartaLocation())
	currentDate := now.Format("2006-01-02")
	activities, err := s.repo.GetUpcomingActivities(currentDate, 3)
	if err != nil {
		return nil, err
	}
	enrichActivitiesWithRelativeDates(activities, now)
	return activities, nil
}

func (s *publicContentService) GetCalendarActivitiesByDate(ctx context.Context, date string) ([]entity.UpcomingActivity, error) {
	selectedDate, err := time.ParseInLocation("2006-01-02", date, jakartaLocation())
	if err != nil {
		return nil, err
	}
	activities, err := s.repo.GetCalendarActivitiesByDate(date)
	if err != nil {
		return nil, err
	}
	now := time.Now().In(jakartaLocation())
	enrichActivitiesWithRelativeDates(activities, now)
	for i := range activities {
		activities[i].IsPast = dateOnly(selectedDate).Before(dateOnly(now))
		if activities[i].IsPast {
			activities[i].StatusLabel = "Sudah selesai"
		}
	}
	return activities, nil
}

func (s *publicContentService) GetCalendarActivityDates(ctx context.Context, month string) ([]string, error) {
	start, err := time.ParseInLocation("2006-01", month, jakartaLocation())
	if err != nil {
		return nil, err
	}
	return s.repo.GetCalendarActivityDates(start.Format("2006-01-02"), start.AddDate(0, 1, 0).Format("2006-01-02"))
}

func (s *publicContentService) ProxyAsset(ctx context.Context, key string) (io.ReadCloser, string, error) {
	if s.storageService == nil {
		return nil, "", errors.New("storage service is not configured")
	}
	return s.storageService.GetFile(ctx, key)
}

func normalizePagination(page, pageSize, defaultPageSize, maxPageSize int) (int, int) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 {
		pageSize = defaultPageSize
	}
	if pageSize > maxPageSize {
		pageSize = maxPageSize
	}
	return page, pageSize
}

func jakartaLocation() *time.Location {
	loc, err := time.LoadLocation("Asia/Jakarta")
	if err != nil {
		return time.FixedZone("WIB", 7*60*60)
	}
	return loc
}

func enrichActivitiesWithRelativeDates(activities []entity.UpcomingActivity, now time.Time) {
	today := dateOnly(now)
	for i := range activities {
		eventDate := dateOnly(activities[i].Date.In(jakartaLocation()))
		daysUntil := int(eventDate.Sub(today).Hours() / 24)
		activities[i].DaysUntil = daysUntil
		activities[i].IsPast = daysUntil < 0
		if daysUntil < 0 {
			activities[i].RelativeDateLabel = "Sudah selesai"
			activities[i].StatusLabel = "Sudah selesai"
		} else if daysUntil == 0 {
			activities[i].RelativeDateLabel = "Hari ini"
		} else if daysUntil == 1 {
			activities[i].RelativeDateLabel = "Besok"
		} else {
			activities[i].RelativeDateLabel = strconv.Itoa(daysUntil) + " hari lagi"
		}
	}
}

func dateOnly(t time.Time) time.Time {
	loc := jakartaLocation()
	local := t.In(loc)
	return time.Date(local.Year(), local.Month(), local.Day(), 0, 0, 0, 0, loc)
}
