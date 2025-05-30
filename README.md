# Medical Office Frontend

A modern web application for managing medical appointments, patient records, and clinic operations.

## Features

- 🔐 **Authentication & Authorization**
  - Role-based access control (Admin and Doctor roles)
  - Secure login system
  - Protected routes

- 📅 **Appointment Management**
  - Create and manage medical appointments
  - View appointment schedules
  - Update appointment status (Scheduled, Completed, Cancelled)
  - Create medical records for completed appointments

- 👥 **Patient Management**
  - Patient registration and information management
  - View patient medical history
  - Access patient records

- 👨‍⚕️ **Doctor Management**
  - Doctor registration and profiles
  - Specialty management
  - Availability scheduling

- 🏥 **Consultation Room Management**
  - Room allocation
  - Room status tracking
  - Floor and description management

- 📋 **Medical Records**
  - Create and manage medical records
  - Link records to appointments
  - View patient diagnosis and notes

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Icons**: Lucide Icons
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd MedicalOffice_Front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── ...            # Other components
├── contexts/          # React contexts
├── lib/              # Utility functions
├── pages/            # Page components
├── services/         # API services
└── App.jsx           # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The frontend integrates with a RESTful API. The main endpoints are:

- `/auth` - Authentication endpoints
- `/appointments` - Appointment management
- `/patients` - Patient management
- `/doctors` - Doctor management
- `/rooms` - Consultation room management
- `/records` - Medical records management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
