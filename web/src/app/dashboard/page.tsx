'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiBarChart2, FiBookOpen, FiDollarSign } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '@/lib/api';
import Protected from '@/components/Protected';
import Layout from '@/components/Layout';
import GitHubWidget from '@/components/GitHubWidget';
import { GITHUB_CONFIG } from '@/config/github';

export default function DashboardPage() {
  const [stats, setStats] = useState({ 
    totalStudents: 0, 
    totalTeachers: 0, 
    totalClasses: 0,
    totalFees: 0 
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentTeachers, setRecentTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load statistics
      const [studentsRes, teachersRes, classesRes] = await Promise.all([
        api.get('/students'),
        api.get('/teachers'),
        api.get('/classes')
      ]);

      const totalStudents = studentsRes.data.data?.length || 0;
      const totalTeachers = teachersRes.data.data?.length || 0;
      const totalClasses = classesRes.data.data?.length || 0;

      setStats({
        totalStudents,
        totalTeachers,
        totalClasses,
        totalFees: totalStudents * 500 // Mock fee calculation
      });

      // Load recent data
      setRecentStudents(studentsRes.data.data?.slice(0, 5) || []);
      setRecentTeachers(teachersRes.data.data?.slice(0, 5) || []);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Students', value: stats.totalStudents },
    { name: 'Teachers', value: stats.totalTeachers },
    { name: 'Classes', value: stats.totalClasses },
  ];

  const monthlyData = [
    { month: 'Jan', students: 120, teachers: 15 },
    { month: 'Feb', students: 135, teachers: 16 },
    { month: 'Mar', students: 150, teachers: 18 },
    { month: 'Apr', students: 165, teachers: 19 },
    { month: 'May', students: 180, teachers: 20 },
    { month: 'Jun', students: 195, teachers: 22 },
  ];

  if (loading) {
    return (
      <Protected>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </Layout>
      </Protected>
    );
  }

  return (
    <Protected>
      <Layout>
        <div className="p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex items-center">
                <FiUsers className="text-3xl text-blue-500 mr-4" />
                <div>
                  <h2 className="text-gray-500 text-sm">Total Students</h2>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalStudents}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <div className="flex items-center">
                <FiBookOpen className="text-3xl text-green-500 mr-4" />
                <div>
                  <h2 className="text-gray-500 text-sm">Total Teachers</h2>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalTeachers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
              <div className="flex items-center">
                <FiBarChart2 className="text-3xl text-purple-500 mr-4" />
                <div>
                  <h2 className="text-gray-500 text-sm">Total Classes</h2>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalClasses}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <div className="flex items-center">
                <FiDollarSign className="text-3xl text-yellow-500 mr-4" />
                <div>
                  <h2 className="text-gray-500 text-sm">Total Fees</h2>
                  <p className="text-2xl font-bold text-gray-800">${stats.totalFees.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and GitHub Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Charts - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-gray-700 font-bold mb-4">Growth Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={2} name="Students" />
                    <Line type="monotone" dataKey="teachers" stroke="#10B981" strokeWidth={2} name="Teachers" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-gray-700 font-bold mb-4">System Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GitHub Widget - Takes 1 column */}
            <div className="lg:col-span-1">
              <GitHubWidget 
                username={GITHUB_CONFIG.username}
                showRepositories={GITHUB_CONFIG.widget.showRepositories}
                maxRepos={GITHUB_CONFIG.widget.maxRepos}
              />
            </div>
          </div>

          {/* Recent Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Students</h2>
              </div>
              <div className="p-6">
                {recentStudents.length > 0 ? (
                  <div className="space-y-3">
                    {recentStudents.map((student: any, index) => (
                      <div key={student._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                        <span className="text-sm text-gray-400">Roll: {student.rollNo}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No students found</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Recent Teachers</h2>
              </div>
              <div className="p-6">
                {recentTeachers.length > 0 ? (
                  <div className="space-y-3">
                    {recentTeachers.map((teacher: any, index) => (
                      <div key={teacher._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{teacher.name}</p>
                          <p className="text-sm text-gray-500">{teacher.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects?.slice(0, 2).map((subject: string, idx: number) => (
                              <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No teachers found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Protected>
  );
}
