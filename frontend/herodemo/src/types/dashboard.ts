export interface Student {
  id: string
  name: string
  email: string
  major: string
  year: number
  currentGPA: number
  totalCredits: number
  enrolledCourses: Course[]
  upcomingAssignments: Assignment[]
  avatar?: string
}

export interface Course {
  id: number
  code: string
  title: string
  instructor: string
  credits: number
  schedule: string
  location?: string
  department: string
  status: string
  grade?: string
  gradePercentage?: number
  color?: string
  availableSeats?: number
  registered?: boolean
}

export interface Assignment {
  id: number
  title: string
  courseCode: string
  dueDate: string
  description: string
}
