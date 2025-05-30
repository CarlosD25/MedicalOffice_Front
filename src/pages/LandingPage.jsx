import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import {
  Calendar,
  Users,
  Clock,
  ClipboardList,
  Building2,
  CheckCircle,
} from 'lucide-react';

const features = [
  {
    name: 'Appointment Management',
    description:
      'Efficiently schedule and manage medical appointments with our intuitive system.',
    icon: Calendar,
  },
  {
    name: 'Patient Records',
    description:
      'Securely store and access patient information and medical history.',
    icon: Users,
  },
  {
    name: 'Real-time Availability',
    description:
      'Check doctor and consultation room availability in real-time.',
    icon: Clock,
  },
  {
    name: 'Medical Records',
    description:
      'Maintain detailed medical records for each patient visit.',
    icon: ClipboardList,
  },
  {
    name: 'Room Management',
    description:
      'Optimize consultation room usage with our smart allocation system.',
    icon: Building2,
  },
  {
    name: 'Automated Validation',
    description:
      'Prevent scheduling conflicts and ensure proper resource allocation.',
    icon: CheckCircle,
  },
];

const LandingPage = () => {
  return (
    <div className="bg-background">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
                  <span className="block">Modern Healthcare</span>{' '}
                  <span className="block text-primary">Management System</span>
                </h1>
                <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your medical practice with our comprehensive
                  appointment management system. Efficiently handle scheduling,
                  patient records, and resource allocation.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/login">
                      <Button size="lg" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage your practice
            </p>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
              Our comprehensive system helps you streamline your medical practice
              operations and improve patient care.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-foreground">
                    {feature.name}
                  </p>
                  <p className="mt-2 ml-16 text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 