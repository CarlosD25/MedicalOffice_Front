import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import PatientService from '../services/PatientService';
import { toast } from 'sonner';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await PatientService.getAll();
      setPatients(data);
    } catch (error) {
      toast.error('Error fetching patients');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicalRecords = async (patientId) => {
    try {
      const data = await PatientService.getMedicalRecords(patientId);
      setMedicalRecords(data);
    } catch (error) {
      toast.error('Error fetching medical records');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PatientService.create(formData);
      toast.success('Patient created successfully');
      fetchPatients();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      toast.error('Error creating patient');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await PatientService.delete(id);
        toast.success('Patient deleted successfully');
        fetchPatients();
      } catch (error) {
        toast.error('Error deleting patient');
      }
    }
  };

  const handleViewRecords = async (patient) => {
    setSelectedPatient(patient);
    await fetchMedicalRecords(patient.id);
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Patients List</TabsTrigger>
          <TabsTrigger value="create">Create Patient</TabsTrigger>
          {selectedPatient && (
            <TabsTrigger value="records">Medical Records</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.fullName}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phone}</td>
                      <td>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewRecords(patient)}
                          >
                            View Records
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(patient.id)}
                          >
                            Delete
                          </Button>
                        </div>
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
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit">Create Patient</Button>
          </form>
        </TabsContent>

        {selectedPatient && (
          <TabsContent value="records">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Medical Records for {selectedPatient.fullName}
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedPatient(null)}
                >
                  Close
                </Button>
              </div>

              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicalRecords.map((record) => (
                        <tr key={record.id}>
                          <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                          <td>{record.diagnosis}</td>
                          <td>{record.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PatientsPage; 