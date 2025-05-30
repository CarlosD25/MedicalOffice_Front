import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import MedicalRecordService from '../services/MedicalRecordService';
import { toast } from 'sonner';

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const data = await MedicalRecordService.getAll();
      setRecords(data);
    } catch (error) {
      toast.error('Error fetching medical records');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medical record?')) {
      try {
        await MedicalRecordService.delete(id);
        toast.success('Medical record deleted successfully');
        fetchRecords();
      } catch (error) {
        toast.error('Error deleting medical record');
      }
    }
  };

  if (loading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Medical Records</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Appointment ID</th>
                    <th>Diagnosis</th>
                    <th>Notes</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.patientId}</td>
                      <td>{record.appointmentId}</td>
                      <td>{record.diagnosis}</td>
                      <td>{record.notes}</td>
                      <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecordsPage; 