# School Management System

A comprehensive school management system built with Next.js (Frontend) and Node.js/Express (Backend) with MongoDB database.

## Features

- **Dashboard**: Real-time statistics and analytics with charts
- **Student Management**: Add, edit, delete, and view student information
- **Teacher Management**: Manage teacher profiles and subjects
- **Class Management**: Create and manage school classes
- **Authentication**: Secure login/logout system
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Icons** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd school-management-system
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/school_management
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
```

The API will be running on `http://localhost:4000`

### 3. Frontend Setup
```bash
cd web
npm install
```

Create a `.env.local` file in the web directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Start the frontend development server:
```bash
npm run dev
```

The application will be running on `http://localhost:3000`

### 4. First Time Setup
1. Open `http://localhost:3000` in your browser
2. Click "Switch to Register Admin" to create the first admin account
3. Use the default credentials or create your own:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Login and start managing your school!

## API Endpoints

### Authentication
- `POST /api/auth/register-admin` - Register admin
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

## Project Structure

```
school-management-system/
├── server/                 # Backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middlewares
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   └── package.json
├── web/                    # Frontend
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utility libraries
│   └── package.json
└── README.md
```

## Features in Detail

### Dashboard
- Real-time statistics cards
- Interactive charts showing growth trends
- Recent students and teachers lists
- Responsive design for all screen sizes

### Student Management
- Complete CRUD operations
- Student profile with roll number, name, email
- Parent information (name, contact, address)
- Search and filter capabilities

### Teacher Management
- Teacher profiles with subjects
- Subject tags for easy identification
- Contact information management
- Assignment tracking

### Class Management
- Class creation with sections
- Capacity management
- Class-wise student tracking
- Section-wise organization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Future Enhancements

- [ ] Attendance management
- [ ] Exam and results management
- [ ] Fee management
- [ ] Timetable management
- [ ] Parent portal
- [ ] Student portal
- [ ] Teacher portal
- [ ] Report generation
- [ ] Email notifications
- [ ] File upload for documents
