import api from './api';

class AppointmentService {
  async getAll() {
    const response = await api.get('/appointments');
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  }

  async create(appointmentData) {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  }

  async update(id, appointmentData) {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  }

  async updateStatus(id, status) {
    const response = await api.patch(`/appointments/${id}`, { status });
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  }

  // Helper method to validate appointment time conflicts
  validateTimeConflict(startTime, endTime, existingAppointments, excludeId = null) {
    return existingAppointments.some(appointment => {
      if (excludeId && appointment.id === excludeId) return false;
      
      const appointmentStart = new Date(appointment.startTime);
      const appointmentEnd = new Date(appointment.endTime);
      const newStart = new Date(startTime);
      const newEnd = new Date(endTime);

      return (
        (newStart >= appointmentStart && newStart < appointmentEnd) ||
        (newEnd > appointmentStart && newEnd <= appointmentEnd) ||
        (newStart <= appointmentStart && newEnd >= appointmentEnd)
      );
    });
  }
}

export default new AppointmentService();
