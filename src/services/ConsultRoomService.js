import api from './api';

class ConsultRoomService {
  async getAll() {
    const response = await api.get('/rooms');
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  }

  async create(roomData) {
    const response = await api.post('/rooms', roomData);
    return response.data;
  }

  async update(id, roomData) {
    const response = await api.put(`/rooms/${id}`, roomData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/rooms/${id}`);
    return response.data;
  }

  // Helper method to check room availability
  isAvailable(roomId, startTime, endTime, appointments) {
    return !appointments.some(appointment => {
      if (appointment.consultRoomId !== roomId) return false;

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

export default new ConsultRoomService();
