import api from './api';

class DoctorService {
  async getAll() {
    const response = await api.get('/doctors');
    return response.data;
  }

  async getById(id) {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  }

  async create(doctorData) {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  }

  async update(id, doctorData) {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  }

  async delete(id) {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  }

  // Helper method to check doctor availability
  isAvailable(doctor, startTime, endTime) {
    const appointmentStart = new Date(startTime);
    const appointmentEnd = new Date(endTime);
    
    const [availableFromHours, availableFromMinutes] = doctor.availableFrom.split(':').map(Number);
    const [availableToHours, availableToMinutes] = doctor.availableTo.split(':').map(Number);

    const availableFrom = new Date(appointmentStart);
    availableFrom.setHours(availableFromHours, availableFromMinutes, 0);

    const availableTo = new Date(appointmentStart);
    availableTo.setHours(availableToHours, availableToMinutes, 0);

    return (
      appointmentStart >= availableFrom &&
      appointmentEnd <= availableTo
    );
  }
}

export default new DoctorService();
