import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Calendar,
  Users,
  UserCog,
  Building2,
  CalendarDays,
  ClipboardList,
} from 'lucide-react';

const HomePage = () => {
  const { isAdmin } = useAuth();

  const cards = [
    {
      title: 'Appointments',
      description: 'Manage medical appointments and schedules',
      icon: Calendar,
      path: '/appointments',
      show: true,
    },
    {
      title: 'Schedule',
      description: 'View and manage doctor schedules',
      icon: CalendarDays,
      path: '/schedule',
      show: true,
    },
    {
      title: 'Patients',
      description: 'Manage patient records and information',
      icon: Users,
      path: '/patients',
      show: isAdmin(),
    },
    {
      title: 'Doctors',
      description: 'Manage doctors and their specialties',
      icon: UserCog,
      path: '/doctors',
      show: isAdmin(),
    },
    {
      title: 'Consult Rooms',
      description: 'Manage consultation rooms',
      icon: Building2,
      path: '/rooms',
      show: isAdmin(),
    },
    {
      title: 'Medical Records',
      description: 'Access and manage patient medical records',
      icon: ClipboardList,
      path: '/appointments',
      show: true,
    },
  ];

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Welcome to Medical Office
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards
            .filter((card) => card.show)
            .map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.path}
                  className="block group"
                >
                  <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 