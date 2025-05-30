import React, { useState, useEffect } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import { Label } from '../components/ui/Label';
import { Input } from '../components/ui/Input';
import DoctorService from '../services/DoctorService';
import AppointmentService from '../services/AppointmentService';
import { formatDateTime, getAppointmentStatusColor } from '../lib/utils';
import { toast } from 'sonner';

const SchedulePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAppointments();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchDoctors = async () => {
    try {
      const data = await DoctorService.getAll();
      setDoctors(data);
    } catch (error) {
      toast.error('Error fetching doctors');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const data = await AppointmentService.getAll();
      // Filter appointments for selected doctor and date
      const filteredAppointments = data.filter(
        (appointment) =>
          appointment.doctorId.toString() === selectedDoctor &&
          new Date(appointment.startTime).toISOString().split('T')[0] === selectedDate
      );
      setAppointments(filteredAppointments);
    } catch (error) {
      toast.error('Error fetching appointments');
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await AppointmentService.updateStatus(appointmentId, newStatus);
      toast.success('Appointment status updated');
      fetchAppointments();
    } catch (error) {
      toast.error('Error updating appointment status');
    }
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select
                value={selectedDoctor}
                onValueChange={setSelectedDoctor}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      {doctor.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-1/2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {selectedDoctor && (
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Room</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No appointments scheduled for this date
                        </td>
                      </tr>
                    ) : (
                      appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>
                            {formatDateTime(appointment.startTime)} -{' '}
                            {formatDateTime(appointment.endTime)}
                          </td>
                          <td>{appointment.patientName}</td>
                          <td>{appointment.consultRoomDescription}</td>
                          <td>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAppointmentStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td>
                            {appointment.status === 'SCHEDULED' && (
                              <div className="flex space-x-2">
                                <button
                                  className="text-sm text-green-600 hover:text-green-800"
                                  onClick={() =>
                                    handleStatusChange(appointment.id, 'COMPLETED')
                                  }
                                >
                                  Complete
                                </button>
                                <button
                                  className="text-sm text-red-600 hover:text-red-800"
                                  onClick={() =>
                                    handleStatusChange(appointment.id, 'CANCELLED')
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage; 