import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import ConsultRoomService from '../services/ConsultRoomService';
import { toast } from 'sonner';

const ConsultRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    floor: '',
    description: '',
    name: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await ConsultRoomService.getAll();
      setRooms(data);
    } catch (error) {
      toast.error('Error fetching consultation rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ConsultRoomService.create({
        ...formData,
        floor: parseInt(formData.floor),
      });
      toast.success('Consultation room created successfully');
      fetchRooms();
      setFormData({
        floor: '',
        description: '',
        name: '',
      });
    } catch (error) {
      toast.error('Error creating consultation room');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation room?')) {
      try {
        await ConsultRoomService.delete(id);
        toast.success('Consultation room deleted successfully');
        fetchRooms();
      } catch (error) {
        toast.error('Error deleting consultation room');
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
          <TabsTrigger value="list">Rooms List</TabsTrigger>
          <TabsTrigger value="create">Create Room</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Floor</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id}>
                      <td>{room.name}</td>
                      <td>{room.floor}</td>
                      <td>{room.description}</td>
                      <td>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(room.id)}
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

        <TabsContent value="create">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  type="number"
                  value={formData.floor}
                  onChange={(e) =>
                    setFormData({ ...formData, floor: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit">Create Room</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsultRoomsPage; 