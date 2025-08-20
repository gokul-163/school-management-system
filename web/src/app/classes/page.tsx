'use client';
import Protected from '@/components/Protected';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

type Class = { 
  _id: string; 
  name: string; 
  section: string; 
  capacity: number;
  teacherId?: string;
  createdAt: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [capacity, setCapacity] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const { data } = await api.get('/classes');
      setClasses(data.data || []);
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/classes', { 
        name, 
        section, 
        capacity: parseInt(capacity) 
      });
      setName(''); 
      setSection(''); 
      setCapacity('');
      await load();
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    setLoading(true);
    try {
      await api.put(`/classes/${editingId}`, { 
        name, 
        section, 
        capacity: parseInt(capacity) 
      });
      setName(''); 
      setSection(''); 
      setCapacity('');
      setEditingId(null);
      await load();
    } catch (error) {
      console.error('Error updating class:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClass = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    
    try {
      await api.delete(`/classes/${id}`);
      await load();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const startEdit = (classItem: Class) => {
    setEditingId(classItem._id);
    setName(classItem.name);
    setSection(classItem.section);
    setCapacity(classItem.capacity.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setSection('');
    setCapacity('');
  };

  return (
    <Protected>
      <Layout>
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Classes Management</h1>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Class' : 'Add New Class'}
            </h2>
            
            <form onSubmit={editingId ? update : create} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  placeholder="Class Name (e.g., 10th)" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input 
                  placeholder="Section (e.g., A, B, C)" 
                  value={section} 
                  onChange={e => setSection(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input 
                  placeholder="Capacity" 
                  type="number"
                  value={capacity} 
                  onChange={e => setCapacity(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingId ? 'Update' : 'Add Class')}
                </button>
                {editingId && (
                  <button 
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Classes Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">All Classes</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.map((classItem, i) => (
                    <tr key={classItem._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {classItem.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {classItem.section}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {classItem.capacity} students
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(classItem.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(classItem)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteClass(classItem._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {classes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No classes found. Add your first class above.
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Protected>
  );
}
