import api from './api';

const MedicalRecordService = {
  create: async (recordData) => {
    const response = await api.post('/records', recordData);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/records');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/records/${id}`);
    return response.data;
  },

  getByAppointmentId: async (appointmentId) => {
    const response = await api.get(`/records/appointment/${appointmentId}`);
    return response.data;
  },

  update: async (id, recordData) => {
    const response = await api.put(`/records/${id}`, recordData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/records/${id}`);
    return response.data;
  }
};

export default MedicalRecordService; 