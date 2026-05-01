import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1/admin',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const worshipScheduleApi = {
  getAll: () => api.get('/worship-schedules'),
  create: (data) => api.post('/worship-schedules', data),
  update: (id, data) => api.put(`/worship-schedules/${id}`, data),
  delete: (id) => api.delete(`/worship-schedules/${id}`),
};

export const dailyVerseApi = {
  getAll: () => api.get('/daily-verses'),
  create: (data) => api.post('/daily-verses', data),
  update: (id, data) => api.put(`/daily-verses/${id}`, data),
  delete: (id) => api.delete(`/daily-verses/${id}`),
};

export const wartaApi = {
  getAll: () => api.get('/wartas'),
  create: (formData) => api.post('/wartas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(`/wartas/${id}`),
};

export const announcementApi = {
  getAll: () => api.get('/announcements'),
  create: (formData) => api.post('/announcements', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/announcements/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export const ministryActivityApi = {
  getAll: () => api.get('/ministry-activities'),
  create: (formData) => api.post('/ministry-activities', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/ministry-activities/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/ministry-activities/${id}`),
};

export const dashboardApi = {
  getStats: () => api.get('/stats'),
};

export default api;
