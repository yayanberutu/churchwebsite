// src/api/publicContentApi.js

const BASE_URL = "http://localhost:8080/api/v1/public";

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
