import { AppUser, Project } from '../types';

export const PRIMARY_OWNER_EMAILS = [
  'lynakeo096@gmail.com'
];

export const INITIAL_USERS: AppUser[] = [
  {
    email: 'lynakeo096@gmail.com',
    name: 'KEO LYNA (ម្ចាស់កម្មសិទ្ធិ)',
    status: 'approved',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Lyna+Keo&background=1a73e8&color=ffffff&size=256&bold=true&font-size=0.45',
    phone: '096 888 9999',
    joinedAt: '2025-01-01'
  }
];

const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const in3Days = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
const in7Days = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
const in15Days = new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    userEmail: 'lynakeo096@gmail.com',
    title: 'អាពាហ៍ពិពាហ៍ លោក សុខ & អ្នកនាង ចាន់',
    eventType: 'Wedding',
    clientName: 'លោក សុខ និង អ្នកនាង ចាន់',
    clientPhone: '012 345 678',
    location: 'សណ្ឋាគារ ហ៊ីយ៉ាត់ រីជិនស៊ី ភ្នំពេញ (Hyatt Regency)',
    shootingDate: tomorrow,
    shootingTime: '06:30',
    deliveryDeadline: in15Days,
    status: 'Shooting',
    totalPrice: 1500,
    deposit: 600,
    collaborators: [
      { name: 'ជាង រិទ្ធ', role: 'Second Camera', phone: '012 999 111' },
      { name: 'ជាង ពិសិដ្ឋ', role: 'Lighting / Assistant', phone: '087 222 333' },
      { name: 'កញ្ញា ម៉ាលី', role: 'Makeup / Hair Stylist', phone: '096 444 555' }
    ],
    equipmentChecklist: [
      { id: 1, name: 'Sony FX3 + Sony A7IV Body', checked: true },
      { id: 2, name: 'Lens 24-70mm f2.8 GM II & 85mm f1.4', checked: true },
      { id: 3, name: 'Godox V1 Flash x2 + AD200Pro', checked: true },
      { id: 4, name: 'DJI RS3 Pro Gimbal', checked: true },
      { id: 5, name: 'SD Cards 128GB V90 x4 + ថ្ម 8 គ្រាប់', checked: false }
    ],
    notes: 'ភ្ញៀវស្នើសុំរូប Highlight ១០ សន្លឹកមុននៅយប់ថ្ងៃថត ដើម្បីបង្ហោះ Facebook និង IG។',
    driveLink: 'https://drive.google.com'
  },
  {
    id: 'p2',
    userEmail: 'lynakeo096@gmail.com',
    title: 'ថតរូបផលិតផល ឡេថែស្បែក SkinCare Series',
    eventType: 'Product',
    clientName: 'ក្រុមហ៊ុន Beauty Cambodia',
    clientPhone: '098 765 432',
    location: 'Studio លេខ ៥ សង្កាត់បឹងកេងកង ភ្នំពេញ',
    shootingDate: in3Days,
    shootingTime: '13:00',
    deliveryDeadline: in7Days,
    status: 'Booking',
    totalPrice: 500,
    deposit: 250,
    collaborators: [
      { name: 'កញ្ញា លីដា', role: 'Prop & Set Stylist', phone: '070 888 777' }
    ],
    equipmentChecklist: [
      { id: 1, name: 'Macro Lens 90mm f2.8', checked: true },
      { id: 2, name: 'Godox Softbox Grid 120cm + C-Stand x2', checked: false },
      { id: 3, name: 'Reflector បន្ទះជះពន្លឺពណ៌ស/ប្រាក់', checked: true },
      { id: 4, name: 'Acrylic Display Sheets', checked: true }
    ],
    notes: 'ត្រូវការ Background ពណ៌ស និង Pastel ផ្កាឈូកខ្ចី។ ផ្តោតលើភាពរលើបរលោងនៃសាច់គ្រីម។',
    driveLink: ''
  },
  {
    id: 'p3',
    userEmail: 'lynakeo096@gmail.com',
    title: 'ថត Pre-Wedding Outdoor កំពត-បូកគោ',
    eventType: 'Pre-Wedding',
    clientName: 'លោក វណ្ណា & កញ្ញា សុភា',
    clientPhone: '015 888 333',
    location: 'ភ្នំបូកគោ និង មាត់ព្រែកកំពត',
    shootingDate: in7Days,
    shootingTime: '05:30',
    deliveryDeadline: in15Days,
    status: 'Booking',
    totalPrice: 1200,
    deposit: 500,
    collaborators: [
      { name: 'ជាង វិបុល', role: 'Drone Pilot (DJI Mavic 3 Pro)', phone: '092 123 456' },
      { name: 'អ្នកនាង សុជាតិ', role: 'Bridal Stylist', phone: '081 987 654' }
    ],
    equipmentChecklist: [
      { id: 1, name: 'Drone DJI Mavic 3 Pro + ថ្ម 3', checked: false },
      { id: 2, name: 'Lens 70-200mm f2.8 & 35mm f1.4', checked: true },
      { id: 3, name: 'Smoke Bomb + Portable Wind Blower', checked: false },
      { id: 4, name: 'ND Filters Pack', checked: true }
    ],
    notes: 'ចាប់ផ្តើមថតថ្ងៃរះលើកំពូលភ្នំបូកគោ ម៉ោង ៦ ព្រឹក បន្ទាប់មកថត Sunset មាត់ព្រែកកំពត។',
    driveLink: ''
  }
];
