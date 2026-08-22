export type EventType =
  | 'Wedding'
  | 'Pre-Wedding'
  | 'Birthday'
  | 'Event'
  | 'Product'
  | 'Portrait'
  | 'Graduation';

export type ProjectStatus =
  | 'Booking'
  | 'Shooting'
  | 'Editing'
  | 'Delivered';

export interface Collaborator {
  name: string;
  role: string;
  phone?: string;
}

export interface EquipmentItem {
  id: number;
  name: string;
  checked: boolean;
}

export interface Project {
  id: string;
  userEmail: string;
  title: string;
  eventType: EventType;
  clientName: string;
  clientPhone: string;
  location: string;
  shootingDate: string; // YYYY-MM-DD
  shootingTime: string; // HH:MM
  deliveryDeadline: string; // YYYY-MM-DD
  status: ProjectStatus;
  totalPrice: number;
  deposit: number;
  collaborators: Collaborator[];
  equipmentChecklist: EquipmentItem[];
  notes?: string;
  driveLink?: string;
  createdAt?: string;
}

export type UserRole = 'admin' | 'user';
export type UserStatus = 'approved' | 'pending' | 'rejected';

export interface AppUser {
  email: string;
  name: string;
  status: UserStatus;
  role: UserRole;
  avatar: string;
  phone?: string;
  joinedAt?: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'projects'
  | 'calendar'
  | 'collaborators'
  | 'security'
  | 'admin'
  | 'settings';
