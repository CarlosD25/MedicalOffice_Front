import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time) {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(datetime) {
  return new Date(datetime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getTimeSlots(startTime, endTime, duration = 30) {
  const slots = [];
  let currentTime = new Date(startTime);
  const end = new Date(endTime);

  while (currentTime < end) {
    slots.push(new Date(currentTime));
    currentTime = new Date(currentTime.getTime() + duration * 60000);
  }

  return slots;
}

export function isWithinBusinessHours(datetime, businessStart = '09:00', businessEnd = '17:00') {
  const date = new Date(datetime);
  const [startHour, startMinute] = businessStart.split(':').map(Number);
  const [endHour, endMinute] = businessEnd.split(':').map(Number);

  const businessStartTime = new Date(date);
  businessStartTime.setHours(startHour, startMinute, 0);

  const businessEndTime = new Date(date);
  businessEndTime.setHours(endHour, endMinute, 0);

  return date >= businessStartTime && date <= businessEndTime;
}

export function getAppointmentStatusColor(status) {
  switch (status) {
    case 'SCHEDULED':
      return 'bg-blue-100 text-blue-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
} 