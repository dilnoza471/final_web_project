"use client"

import { useContext } from "react"

import type React from "react"
import { createContext, useState } from "react"
import type { Student, Course } from "../types/dashboard"

// Import the mock data and schedule utilities
import { mockStudent, mockAvailableCourses } from "../components/dashboard/mock-data"
import { checkScheduleOverlap } from "../utils/schedule-utils"

// Mock data
// const mockStudent: Student = {
//   id: "S12345678",
//   name: "Alex Johnson",
//   email: "alex.johnson@university.edu",
//   major: "Computer Science",
//   year: 3,
//   currentGPA: 3.75,
//   totalCredits: 15,
//   enrolledCourses: [
//     {
//       id: 1,
//       code: "CS301",
//       title: "Data Structures and Algorithms",
//       instructor: "Dr. Sarah Chen",
//       credits: 3,
//       schedule: "Mon, Wed 10:00 AM - 11:15 AM",
//       location: "Science Building 105",
//       department: "Computer Science",
//       status: "In Progress",
//       grade: "A-",
//       gradePercentage: 92,
//       color: "#3b82f6",
//       sectionId: "CS301-A",
//     },
//     {
//       id: 2,
//       code: "CS350",
//       title: "Database Systems",
//       instructor: "Prof. Michael Rodriguez",
//       credits: 4,
//       schedule: "Tue, Thu 1:00 PM - 2:45 PM",
//       location: "Engineering Hall 201",
//       department: "Computer Science",
//       status: "In Progress",
//       grade: "B+",
//       gradePercentage: 88,
//       color: "#8b5cf6",
//       sectionId: "CS350-A",
//     },
//     {
//       id: 3,
//       code: "MATH240",
//       title: "Linear Algebra",
//       instructor: "Dr. Emily Watson",
//       credits: 3,
//       schedule: "Mon, Wed 2:00 PM - 3:15 PM",
//       location: "Math Building 110",
//       department: "Mathematics",
//       status: "In Progress",
//       grade: "A",
//       gradePercentage: 95,
//       color: "#ec4899",
//       sectionId: "MATH240-A",
//     },
//     {
//       id: 4,
//       code: "ENG210",
//       title: "Technical Writing",
//       instructor: "Prof. James Miller",
//       credits: 3,
//       schedule: "Fri 9:00 AM - 11:45 AM",
//       location: "Liberal Arts 305",
//       department: "English",
//       status: "In Progress",
//       grade: "B",
//       gradePercentage: 85,
//       color: "#f59e0b",
//       sectionId: "ENG210-A",
//     },
//     {
//       id: 5,
//       code: "PHYS201",
//       title: "Physics for Engineers",
//       instructor: "Dr. Robert Kim",
//       credits: 4,
//       schedule: "Tue, Thu 9:30 AM - 11:15 AM",
//       location: "Science Building 220",
//       department: "Physics",
//       status: "In Progress",
//       grade: "B-",
//       gradePercentage: 82,
//       color: "#10b981",
//       sectionId: "PHYS201-A",
//     },
//   ],
//   upcomingAssignments: [
//     {
//       id: 1,
//       title: "Algorithm Analysis Project",
//       courseCode: "CS301",
//       dueDate: "2025-05-15",
//       description: "Implement and analyze the performance of three sorting algorithms.",
//     },
//     {
//       id: 2,
//       title: "Database Design Assignment",
//       courseCode: "CS350",
//       dueDate: "2025-05-10",
//       description: "Create an ER diagram and implement a relational database for the given case study.",
//     },
//     {
//       id: 3,
//       title: "Matrix Transformations Quiz",
//       courseCode: "MATH240",
//       dueDate: "2025-05-08",
//       description: "Online quiz covering eigenvalues, eigenvectors, and matrix transformations.",
//     },
//     {
//       id: 4,
//       title: "Technical Documentation",
//       courseCode: "ENG210",
//       dueDate: "2025-05-20",
//       description: "Write technical documentation for a software application.",
//     },
//     {
//       id: 5,
//       title: "Physics Lab Report",
//       courseCode: "PHYS201",
//       dueDate: "2025-05-12",
//       description: "Write a lab report on the experiment conducted on electromagnetic induction.",
//     },
//     {
//       id: 6,
//       title: "Midterm Exam",
//       courseCode: "CS301",
//       dueDate: "2025-05-25",
//       description: "Midterm exam covering all topics from weeks 1-7.",
//     },
//   ],
// }

// Available courses with two section options each
// const mockAvailableCourses: Course[] = [
//   {
//     id: 101,
//     code: "CS401",
//     title: "Artificial Intelligence",
//     instructor: "Dr. Alan Turing",
//     credits: 3,
//     department: "Computer Science",
//     status: "Available",
//     color: "#3b82f6",
//     sections: [
//       {
//         sectionId: "CS401-A",
//         schedule: "Mon 9:00 AM - 11:00 AM",
//         location: "Computer Science Building 301",
//         availableSeats: 15,
//         registered: false,
//       },
//       {
//         sectionId: "CS401-B",
//         schedule: "Wed 2:00 PM - 4:00 PM",
//         location: "Computer Science Building 305",
//         availableSeats: 12,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 102,
//     code: "CS420",
//     title: "Machine Learning",
//     instructor: "Dr. Ada Lovelace",
//     credits: 4,
//     department: "Computer Science",
//     status: "Available",
//     color: "#8b5cf6",
//     sections: [
//       {
//         sectionId: "CS420-A",
//         schedule: "Tue 9:00 AM - 11:00 AM",
//         location: "Engineering Hall 205",
//         availableSeats: 5,
//         registered: false,
//       },
//       {
//         sectionId: "CS420-B",
//         schedule: "Thu 2:00 PM - 4:00 PM",
//         location: "Engineering Hall 210",
//         availableSeats: 8,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 103,
//     code: "CS450",
//     title: "Operating Systems",
//     instructor: "Prof. Dennis Ritchie",
//     credits: 4,
//     department: "Computer Science",
//     status: "Available",
//     color: "#ec4899",
//     sections: [
//       {
//         sectionId: "CS450-A",
//         schedule: "Mon 12:00 PM - 2:00 PM",
//         location: "Computer Science Building 110",
//         availableSeats: 0,
//         registered: false,
//       },
//       {
//         sectionId: "CS450-B",
//         schedule: "Wed 4:00 PM - 6:00 PM",
//         location: "Computer Science Building 115",
//         availableSeats: 3,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 104,
//     code: "MATH340",
//     title: "Differential Equations",
//     instructor: "Dr. Katherine Johnson",
//     credits: 3,
//     department: "Mathematics",
//     status: "Available",
//     color: "#f59e0b",
//     sections: [
//       {
//         sectionId: "MATH340-A",
//         schedule: "Tue 12:00 PM - 2:00 PM",
//         location: "Math Building 205",
//         availableSeats: 20,
//         registered: false,
//       },
//       {
//         sectionId: "MATH340-B",
//         schedule: "Thu 9:00 AM - 11:00 AM",
//         location: "Math Building 210",
//         availableSeats: 15,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 105,
//     code: "PHYS301",
//     title: "Quantum Mechanics",
//     instructor: "Dr. Richard Feynman",
//     credits: 4,
//     department: "Physics",
//     status: "Available",
//     color: "#10b981",
//     sections: [
//       {
//         sectionId: "PHYS301-A",
//         schedule: "Mon 2:00 PM - 4:00 PM",
//         location: "Science Building 310",
//         availableSeats: 12,
//         registered: false,
//       },
//       {
//         sectionId: "PHYS301-B",
//         schedule: "Fri 12:00 PM - 2:00 PM",
//         location: "Science Building 315",
//         availableSeats: 10,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 106,
//     code: "ENG310",
//     title: "Advanced Technical Writing",
//     instructor: "Prof. Margaret Atwood",
//     credits: 3,
//     department: "English",
//     status: "Available",
//     color: "#6366f1",
//     sections: [
//       {
//         sectionId: "ENG310-A",
//         schedule: "Wed 9:00 AM - 11:00 AM",
//         location: "Liberal Arts 405",
//         availableSeats: 25,
//         registered: false,
//       },
//       {
//         sectionId: "ENG310-B",
//         schedule: "Fri 2:00 PM - 4:00 PM",
//         location: "Liberal Arts 410",
//         availableSeats: 22,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 107,
//     code: "BIO201",
//     title: "Molecular Biology",
//     instructor: "Dr. Rosalind Franklin",
//     credits: 4,
//     department: "Biology",
//     status: "Available",
//     color: "#14b8a6",
//     sections: [
//       {
//         sectionId: "BIO201-A",
//         schedule: "Tue 2:00 PM - 4:00 PM",
//         location: "Life Sciences 201",
//         availableSeats: 18,
//         registered: false,
//       },
//       {
//         sectionId: "BIO201-B",
//         schedule: "Thu 12:00 PM - 2:00 PM",
//         location: "Life Sciences 205",
//         availableSeats: 15,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 108,
//     code: "CHEM301",
//     title: "Organic Chemistry",
//     instructor: "Dr. Marie Curie",
//     credits: 4,
//     department: "Chemistry",
//     status: "Available",
//     color: "#f43f5e",
//     sections: [
//       {
//         sectionId: "CHEM301-A",
//         schedule: "Mon 4:00 PM - 6:00 PM",
//         location: "Chemistry Building 105",
//         availableSeats: 10,
//         registered: false,
//       },
//       {
//         sectionId: "CHEM301-B",
//         schedule: "Wed 12:00 PM - 2:00 PM",
//         location: "Chemistry Building 110",
//         availableSeats: 8,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 109,
//     code: "PSYC201",
//     title: "Cognitive Psychology",
//     instructor: "Dr. Jean Piaget",
//     credits: 3,
//     department: "Psychology",
//     status: "Available",
//     color: "#a855f7",
//     sections: [
//       {
//         sectionId: "PSYC201-A",
//         schedule: "Tue 4:00 PM - 6:00 PM",
//         location: "Psychology Building 201",
//         availableSeats: 22,
//         registered: false,
//       },
//       {
//         sectionId: "PSYC201-B",
//         schedule: "Thu 4:00 PM - 6:00 PM",
//         location: "Psychology Building 205",
//         availableSeats: 20,
//         registered: false,
//       },
//     ],
//   },
//   {
//     id: 110,
//     code: "ECON210",
//     title: "Microeconomics",
//     instructor: "Dr. Adam Smith",
//     credits: 3,
//     department: "Economics",
//     status: "Available",
//     color: "#0ea5e9",
//     sections: [
//       {
//         sectionId: "ECON210-A",
//         schedule: "Fri 9:00 AM - 11:00 AM",
//         location: "Business Building 301",
//         availableSeats: 30,
//         registered: false,
//       },
//       {
//         sectionId: "ECON210-B",
//         schedule: "Fri 4:00 PM - 6:00 PM",
//         location: "Business Building 305",
//         availableSeats: 25,
//         registered: false,
//       },
//     ],
//   },
// ]

// Create context
interface DashboardContextType {
  studentData: Student
  availableCourses: Course[]
  registerForCourse: (courseId: number, sectionId: string) => void
  hasScheduleConflict: (schedule: string) => boolean
  getRegisteredCoursesCount: () => number
}

const DashboardContextInstance = createContext<DashboardContextType | null>(null)

export const DashboardContext = {
  Provider: DashboardContextInstance.Provider,
  useContext: () => {
    const context = useContext(DashboardContextInstance)
    if (!context) {
      throw new Error("useDashboard must be used within a DashboardProvider")
    }
    return context
  },
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [studentData, setStudentData] = useState<Student>(mockStudent)
  const [availableCourses, setAvailableCourses] = useState<Course[]>(mockAvailableCourses)

  // Helper function to check if a schedule conflicts with existing enrolled courses
  // const hasScheduleConflict = (newSchedule: string): boolean => {
  //   // Extract day and time from the schedule string
  //   const dayMatch = newSchedule.match(/(Mon|Tue|Wed|Thu|Fri)/i)
  //   const timeMatch = newSchedule.match(/(\d+):00\s*(AM|PM)\s*-\s*(\d+):00\s*(AM|PM)/i)

  //   if (!dayMatch || !timeMatch) return false

  //   const newDay = dayMatch[0].toLowerCase()
  //   const newStartHour = Number.parseInt(timeMatch[1])
  //   const newStartAmPm = timeMatch[2].toLowerCase()
  //   const newEndHour = Number.parseInt(timeMatch[3])
  //   const newEndAmPm = timeMatch[4].toLowerCase()

  //   // Convert to 24-hour format
  //   const newStartHour24 = newStartAmPm === "pm" && newStartHour !== 12 ? newStartHour + 12 : newStartHour
  //   const newEndHour24 = newEndAmPm === "pm" && newEndHour !== 12 ? newEndHour + 12 : newEndHour

  //   // Check for conflicts with existing courses
  //   return studentData.enrolledCourses.some((course) => {
  //     // Add null check for schedule
  //     const courseSchedule = course.schedule?.toLowerCase() || ""
  //     if (!courseSchedule) return false

  //     // Check if the day matches
  //     if (!courseSchedule.includes(newDay)) return false

  //     // Extract time from course schedule
  //     const courseTimeMatch = courseSchedule.match(/(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i)
  //     if (!courseTimeMatch) return false

  //     const courseStartHour = Number.parseInt(courseTimeMatch[1])
  //     const courseStartMinute = Number.parseInt(courseTimeMatch[2])
  //     const courseStartAmPm = courseTimeMatch[3].toLowerCase()
  //     const courseEndHour = Number.parseInt(courseTimeMatch[4])
  //     const courseEndMinute = Number.parseInt(courseTimeMatch[5])
  //     const courseEndAmPm = courseTimeMatch[6].toLowerCase()

  //     // Convert to 24-hour format
  //     const courseStartHour24 =
  //       courseStartAmPm === "pm" && courseStartHour !== 12 ? courseStartHour + 12 : courseStartHour
  //     const courseEndHour24 = courseEndAmPm === "pm" && courseEndHour !== 12 ? courseEndHour + 12 : courseEndHour

  //     // Calculate total minutes for more precise comparison
  //     const courseStartTotalMinutes = courseStartHour24 * 60 + courseStartMinute
  //     const courseEndTotalMinutes = courseEndHour24 * 60 + courseEndMinute
  //     const newStartTotalMinutes = newStartHour24 * 60
  //     const newEndTotalMinutes = newEndHour24 * 60

  //     // Check for time overlap using minutes for more precision
  //     return (
  //       (newStartTotalMinutes >= courseStartTotalMinutes && newStartTotalMinutes < courseEndTotalMinutes) ||
  //       (newEndTotalMinutes > courseStartTotalMinutes && newEndTotalMinutes <= courseEndTotalMinutes) ||
  //       (newStartTotalMinutes <= courseStartTotalMinutes && newEndTotalMinutes >= courseEndTotalMinutes)
  //     )
  //   })
  // }

  // Update the hasScheduleConflict function to use the utility
  const hasScheduleConflict = (newSchedule: string): boolean => {
    return studentData.enrolledCourses.some((course) => checkScheduleOverlap(course.schedule, newSchedule))
  }

  // Helper function to get the number of registered courses
  const getRegisteredCoursesCount = (): number => {
    return studentData.enrolledCourses.length
  }

  const registerForCourse = (courseId: number, sectionId: string) => {
    // Find the course
    const course = availableCourses.find((c) => c.id === courseId)
    if (!course || !course.sections) return

    // Find the section
    const section = course.sections.find((s) => s.sectionId === sectionId)
    if (!section) return

    // Check if student already has 5 courses
    if (studentData.enrolledCourses.length >= 5) {
      alert("You cannot register for more than 5 courses.")
      return
    }

    // Check for schedule conflicts
    if (hasScheduleConflict(section.schedule)) {
      alert("This course conflicts with your existing schedule.")
      return
    }

    // Update available courses
    setAvailableCourses((prevCourses) =>
        prevCourses.map((c) => {
          if (c.id === courseId && c.sections) {
            return {
              ...c,
              sections: c.sections.map((s) => {
                if (s.sectionId === sectionId) {
                  return {
                    ...s,
                    registered: true,
                    availableSeats: s.availableSeats - 1,
                  }
                }
                return s
              }),
            }
          }
          return c
        }),
    )

    // Add to enrolled courses
    const newCourse: Course = {
      ...course,
      schedule: section.schedule,
      location: section.location,
      status: "In Progress",
      grade: undefined,
      gradePercentage: 0,
      sectionId: section.sectionId,
    }

    setStudentData((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, newCourse],
      totalCredits: prev.totalCredits + course.credits,
    }))
  }

  return (
      <DashboardContext.Provider
          value={{
            studentData,
            availableCourses,
            registerForCourse,
            hasScheduleConflict,
            getRegisteredCoursesCount,
          }}
      >
        {children}
      </DashboardContext.Provider>
  )
}
