import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import { useAuth } from '../contexts/AuthContext';
import AppointmentService from '../services/AppointmentService';
import DoctorService from '../services/DoctorService';
import PatientService from '../services/PatientService';
import ConsultRoomService from '../services/ConsultRoomService';
import MedicalRecordService from '../services/MedicalRecordService';
import { formatDateTime, getAppointmentStatusColor } from '../lib/utils';
import { toast } from 'sonner';
import MedicalRecordForm from '../components/MedicalRecordForm';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { isAdmin, isDoctor } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    consultRoomId: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsData, doctorsData, patientsData, roomsData] = await Promise.all([
        AppointmentService.getAll(),
        DoctorService.getAll(),
        PatientService.getAll(),
        ConsultRoomService.getAll(),
      ]);

      setAppointments(appointmentsData);
      setDoctors(doctorsData);
      setPatients(patientsData);
      setRooms(roomsData);
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AppointmentService.create({
        ...formData,
        status: 'SCHEDULED',
      });
      toast.success('Appointment created successfully');
      fetchData();
      setFormData({
        patientId: '',
        doctorId: '',
        consultRoomId: '',
        startTime: '',
        endTime: '',
      });
    } catch (error) {
      toast.error('Error creating appointment');
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await AppointmentService.updateStatus(appointmentId, newStatus);
      toast.success('Appointment status updated');
      fetchData();
    } catch (error) {
      toast.error('Error updating appointment status');
    }
  };

  const handleCreateRecord = async (recordData) => {
    try {
      await MedicalRecordService.create(recordData);
      toast.success('Medical record created successfully');
      setSelectedAppointment(null);
      fetchData();
    } catch (error) {
      toast.error('Error creating medical record');
    }
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Appointments List</TabsTrigger>
          <TabsTrigger value="create">Create Appointment</TabsTrigger>
          {selectedAppointment && (
            <TabsTrigger value="record">Create Medical Record</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Room</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.consultRoomDescription}</td>
                      <td>{formatDateTime(appointment.startTime)}</td>
                      <td>{formatDateTime(appointment.endTime)}</td>
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
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(appointment.id, 'COMPLETED')
                              }
                            >
                              Complete
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleStatusChange(appointment.id, 'CANCELLED')
                              }
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        {appointment.status === 'COMPLETED' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            Create Record
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, patientId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="doctor">Doctor</Label>
                <Select
                  value={formData.doctorId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, doctorId: value })
                  }
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

              <div>
                <Label htmlFor="room">Consultation Room</Label>
                <Select
                  value={formData.consultRoomId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, consultRoomId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>
            </div>

            <Button type="submit">Create Appointment</Button>
          </form>
        </TabsContent>

        {selectedAppointment && (
          <TabsContent value="record">
            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold mb-4">
                Create Medical Record for {selectedAppointment.patientName}
              </h2>
              <MedicalRecordForm
                appointment={selectedAppointment}
                patient={patients.find(p => p.id === selectedAppointment.patientId)}
                onSubmit={handleCreateRecord}
                onCancel={() => setSelectedAppointment(null)}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AppointmentsPage; 