export interface Skill {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  isCustom: boolean;
}

export interface Category {
  _id: string;
  name: string;
  sport: string;
  createdAt: string;
  updatedAt: string;
  isCustom: boolean;
  skills: Skill[];
}

export interface Sport {
  _id: string;
  name: string;
  sportsType: string | null;
  skillLevelSet: string | null;
  image: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
}
export interface GymMemberUser {
  _id: string;
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin' | string; // extend as needed
}

export interface GymMember {
  _id: string;
  user: GymMemberUser;
}

export type GymMembersResponse = GymMember[];
interface Preference {
  height: string;
  weight: string;
}

export interface Friend {
  preference: Preference;
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  nationality: string;
  dob: string; // ISO date string
  role: string;
  profileImage?: string; // optional because Hannad doesn’t always have it
  referralSource?: string; // optional because only Huzaifa has it
  createdAt: string;
  updatedAt: string;
  __v: number;
  adminStatus: string;
  coach?: string; // optional
  friends: Friend[]; // nested friends
  stripeCustomerId?: string; // optional because only Huzaifa has it
  token?: string; // optional because only Hannad has it
}

export interface FriendsResponse {
  friends: Friend[];
}
export interface PerformanceType {
  __v: number;
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  image: string; // URL
  name: string;
  sortOrder: number;
}
export interface IJoinChallenge {
  challenge: string;
}

export interface IChallengeParticipation {
  _id: string;
  user: User;
  challenge: Challenge;
  status: 'active' | 'completed' | 'pending' | string; // extend if you know all states
  submissions: Record<string, any>; // empty object for now, update if schema is defined
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  preference: Preference;
  gender: string;
  adminStatus: string;
  nationality: string;
  dob: string; // ISO date
  role: string;
  friends: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
  gym: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  coachTip: string;
  levels: Level[];
  category: Category;
  format: Format;
  categoryType: CategoryType;
  createdAt: string;
  updatedAt: string;
}

export interface Level {
  badge: string; // "Bronze" | "Silver" | "Gold" | "Platinum"
  value: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sortOrder: number;
}

export interface Format {
  _id: string;
  name: string;
  category: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}
