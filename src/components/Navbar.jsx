import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { 
  Calendar, 
  Users, 
  UserCog, 
  Building2, 
  CalendarDays,
  Home,
  LogOut,
  ClipboardList
} from 'lucide-react';

const Navbar = () => {
  const { logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: <Home className="w-4 h-4 mr-2" />,
      show: true,
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: <Calendar className="w-4 h-4 mr-2" />,
      show: true,
    },
    {
      name: 'Schedule',
      path: '/schedule',
      icon: <CalendarDays className="w-4 h-4 mr-2" />,
      show: true,
    },
    {
      name: 'Medical Records',
      path: '/records',
      icon: <ClipboardList className="w-4 h-4 mr-2" />,
      show: true,
    },
    {
      name: 'Patients',
      path: '/patients',
      icon: <Users className="w-4 h-4 mr-2" />,
      show: isAdmin(),
    },
    {
      name: 'Doctors',
      path: '/doctors',
      icon: <UserCog className="w-4 h-4 mr-2" />,
      show: isAdmin(),
    },
    {
      name: 'Consult Rooms',
      path: '/rooms',
      icon: <Building2 className="w-4 h-4 mr-2" />,
      show: isAdmin(),
    },
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/home" className="text-xl font-bold text-primary">
                Medical Office
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems
                .filter((item) => item.show)
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="inline-flex items-center"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems
            .filter((item) => item.show)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 