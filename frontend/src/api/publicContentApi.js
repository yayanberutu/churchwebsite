// src/api/publicContentApi.js

const BASE_URL = "/api/v1/public";

export const fetchLatestWarta = async () => {
  try {
    const response = await fetch(`${BASE_URL}/warta/latest/download`);
    if (!response.ok) throw new Error("Gagal mengambil data warta");
    return await response.json();
  } catch (error) {
    console.error("Error fetching latest warta:", error);
    return { success: false, message: error.message };
  }
};

export const fetchLatestAnnouncements = async () => {
  try {
    const response = await fetch(`${BASE_URL}/announcements/latest`);
    if (!response.ok) throw new Error("Gagal mengambil data pengumuman");
    return await response.json();
  } catch (error) {
    console.error("Error fetching latest announcements:", error);
    return { success: false, message: error.message };
  }
};

export const fetchAnnouncements = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/announcements?page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error("Gagal mengambil daftar pengumuman");
    return await response.json();
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return { success: false, message: error.message };
  }
};

export const fetchAnnouncementDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/announcements/${id}`);
    if (!response.ok) throw new Error("Gagal mengambil detail pengumuman");
    return await response.json();
  } catch (error) {
    console.error("Error fetching announcement detail:", error);
    return { success: false, message: error.message };
  }
};

export const fetchLatestMinistryActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/ministry-activities/latest`);
    if (!response.ok) throw new Error("Gagal mengambil data kegiatan pelayanan");
    return await response.json();
  } catch (error) {
    console.error("Error fetching latest ministry activities:", error);
    return { success: false, message: error.message };
  }
};

export const fetchMinistryActivities = async (page = 1, pageSize = 6) => {
  try {
    const response = await fetch(`${BASE_URL}/ministry-activities?page=${page}&page_size=${pageSize}`);
    if (!response.ok) throw new Error("Gagal mengambil dokumentasi kegiatan pelayanan");
    return await response.json();
  } catch (error) {
    console.error("Error fetching ministry activities:", error);
    return { success: false, message: error.message };
  }
};

export const fetchMinistryActivityDetail = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/ministry-activities/${id}`);
    if (!response.ok) throw new Error("Gagal mengambil detail kegiatan pelayanan");
    return await response.json();
  } catch (error) {
    console.error("Error fetching ministry activity detail:", error);
    return { success: false, message: error.message };
  }
};

export const fetchWorshipSchedules = async () => {
  try {
    const response = await fetch(`${BASE_URL}/worship-schedules`);
    if (!response.ok) throw new Error("Gagal mengambil jadwal ibadah");
    return await response.json();
  } catch (error) {
    console.error("Error fetching worship schedules:", error);
    return { success: false, message: error.message };
  }
};

export const fetchDailyVerse = async () => {
  try {
    const response = await fetch(`${BASE_URL}/daily-verses/today`);
    if (!response.ok) throw new Error("Gagal mengambil ayat harian");
    return await response.json();
  } catch (error) {
    console.error("Error fetching daily verse:", error);
    return { success: false, message: error.message };
  }
};

export const fetchUpcomingActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/upcoming-activities`);
    if (!response.ok) throw new Error("Gagal mengambil kegiatan mendatang");
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming activities:", error);
    return { success: false, message: error.message };
  }
};

export const fetchCalendarActivityDates = async (month) => {
  try {
    const response = await fetch(`${BASE_URL}/calendar/activity-dates?month=${month}`);
    if (!response.ok) throw new Error("Gagal mengambil tanggal kegiatan");
    return await response.json();
  } catch (error) {
    console.error("Error fetching calendar dates:", error);
    return { success: false, message: error.message };
  }
};

export const fetchCalendarActivitiesByDate = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}/calendar/activities?date=${date}`);
    if (!response.ok) throw new Error("Gagal mengambil kegiatan tanggal terpilih");
    return await response.json();
  } catch (error) {
    console.error("Error fetching calendar activities:", error);
    return { success: false, message: error.message };
  }
};
