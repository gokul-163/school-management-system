'use client';
import Protected from '@/components/Protected';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

type Teacher = { 
  _id: string; 
  name: string; 
  email: string; 
  subjects: string[];
  createdAt: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subjects, setSubjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    try {
      const { data } = await api.get('/teachers');
      setTeachers(data.data || []);
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subjectsArray = subjects.split(',').map(s => s.trim()).filter(s => s);
      await api.post('/teachers', { name, email, subjects: subjectsArray });
      setName(''); 
      setEmail(''); 
      setSubjects('');
      await load();
    } catch (error) {
      console.error('Error creating teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    
    setLoading(true);
    try {
      const subjectsArray = subjects.split(',').map(s => s.trim()).filter(s => s);
      await api.put(`/teachers/${editingId}`, { name, email, subjects: subjectsArray });
      setName(''); 
      setEmail(''); 
      setSubjects('');
      setEditingId(null);
      await load();
    } catch (error) {
      console.error('Error updating teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
      await api.delete(`/teachers/${id}`);
      await load();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const startEdit = (teacher: Teacher) => {
    setEditingId(teacher._id);
    setName(teacher.name);
    setEmail(teacher.email);
    setSubjects(teacher.subjects.join(', '));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
    setSubjects('');
  };

  return (
    <Protected>
      <Layout>
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Teachers Management</h1>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Teacher' : 'Add New Teacher'}
            </h2>
            
            <form onSubmit={editingId ? update : create} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input 
                  placeholder="Email" 
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input 
                  placeholder="Subjects (comma separated)" 
                  value={subjects} 
                  onChange={e => setSubjects(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingId ? 'Update' : 'Add Teacher')}
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

          {/* Teachers Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">All Teachers</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher, i) => (
                    <tr key={teacher._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(teacher)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTeacher(teacher._id)}
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
            
            {teachers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No teachers found. Add your first teacher above.
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Protected>
  );
}
