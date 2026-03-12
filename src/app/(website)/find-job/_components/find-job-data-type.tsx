// src/components/find-job-data-type.ts
export interface ScheduleTypes {
  day: string[];
  time: string[];
}

// For API format
export interface DaySchedule {
  day: string;
  startTime?: string;
  endTime?: string;
  time?: string;
}

// For internal state with selection
export interface ScheduleItem extends DaySchedule {
  selected: boolean;
}

export interface FindJobDataTypes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  categoryId: string;
  subscriptionId: string;
  location: string;
  gender: string;
  hourRate: number;
  days: ScheduleTypes;
}