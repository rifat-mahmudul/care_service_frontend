export interface ScheduleTypes {
  day: string[]
  time: string[]
}

export interface FindJobDataTypes {
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  categoryId: string
  subscriptionId: string
  location: string
  gender: string
  hourRate: number
  days: ScheduleTypes
}
