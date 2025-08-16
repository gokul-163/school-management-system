'use client';
import Protected from '@/components/Protected';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

type Student = { _id: string; rollNo: string; name: string; email: string; };

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get('/students');
    setStudents(data.data || []);
  };

  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.post('/students', { rollNo, name, email });
    setRollNo(''); setName(''); setEmail('');
    await load();
    setLoading(false);
  };

  return (
    <Protected>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Students</h1>

        <form onSubmit={create} className="mb-6 flex gap-2">
          <input placeholder="Roll No" value={rollNo} onChange={e => setRollNo(e.target.value)} />
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded">
            Add
          </button>
        </form>

        <table className="min-w-full border">
          <thead>
            <tr>
              <th>ID</th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.rollNo}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Protected>
  );
}
