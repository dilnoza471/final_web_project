"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Student, Course } from "../types/dashboard"

// Mock data
const mockStudent: Student = {
  id: "S12345678",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  major: "Computer Science",
  year: 3,
  currentGPA: 3.75,
  totalCredits: 15,
  enrolledCourses: [
    {
      id: 1,
      code: "CS301",
      title: "Data Structures and Algorithms",
      instructor: "Dr. Sarah Chen",
      credits: 3,
      schedule: "Mon, Wed, Fri 10:00 AM - 11:15 AM",
      location: "Science Building 105",
      department: "Computer Science",
      status: "In Progress",
      grade: "A-",
      gradePercentage: 92,
      color: "#3b82f6",
    },
    {
      id: 2,
      code: "CS350",
      title: "Database Systems",
      instructor: "Prof. Michael Rodriguez",
      credits: 4,
      schedule: "Tue, Thu 1:00 PM - 2:45 PM",
      location: "Engineering Hall 201",
      department: "Computer Science",
      status: "In Progress",
      grade: "B+",
      gradePercentage: 88,
      color: "#8b5cf6",
    },
    {
      id: 3,
      code: "MATH240",
      title: "Linear Algebra",
      instructor: "Dr. Emily Watson",
      credits: 3,
      schedule: "Mon, Wed 2:00 PM - 3:15 PM",
      location: "Math Building 110",
      department: "Mathematics",
      status: "In Progress",
      grade: "A",
      gradePercentage: 95,
      color: "#ec4899",
    },
    {
      id: 4,
      code: "ENG210",
      title: "Technical Writing",
      instructor: "Prof. James Miller",
      credits: 3,
      schedule: "Fri 9:00 AM - 11:45 AM",
      location: "Liberal Arts 305",
      department: "English",
      status: "In Progress",
      grade: "B",
      gradePercentage: 85,
      color: "#f59e0b",
    },
    {
      id: 5,
      code: "PHYS201",
      title: "Physics for Engineers",
      instructor: "Dr. Robert Kim",
      credits: 4,
      schedule: "Tue, Thu 9:30 AM - 11:15 AM",
      location: "Science Building 220",
      department: "Physics",
      status: "In Progress",
      grade: "B-",
      gradePercentage: 82,
      color: "#10b981",
    },
  ],
  upcomingAssignments: [
    {
      id: 1,
      title: "Algorithm Analysis Project",
      courseCode: "CS301",
      dueDate: "2025-05-15",
      description: "Implement and analyze the performance of three sorting algorithms.",
    },
    {
      id: 2,
      title: "Database Design Assignment",
      courseCode: "CS350",
      dueDate: "2025-05-10",
      description: "Create an ER diagram and implement a relational database for the given case study.",
    },
    {
      id: 3,
      title: "Matrix Transformations Quiz",
      courseCode: "MATH240",
      dueDate: "2025-05-08",
      description: "Online quiz covering eigenvalues, eigenvectors, and matrix transformations.",
    },
    {
      id: 4,
      title: "Technical Documentation",
      courseCode: "ENG210",
      dueDate: "2025-05-20",
      description: "Write technical documentation for a software application.",
    },
    {
      id: 5,
      title: "Physics Lab Report",
      courseCode: "PHYS201",
      dueDate: "2025-05-12",
      description: "Write a lab report on the experiment conducted on electromagnetic induction.",
    },
    {
      id: 6,
      title: "Midterm Exam",
      courseCode: "CS301",
      dueDate: "2025-05-25",
      description: "Midterm exam covering all topics from weeks 1-7.",
    },
  ],
}

const mockAvailableCourses: Course[] = [
  {
    id: 101,
    code: "CS401",
    title: "Artificial Intelligence",
    instructor: "Dr. Alan Turing",
    credits: 3,
    schedule: "Mon, Wed 3:30 PM - 4:45 PM",
    location: "Computer Science Building 301",
    department: "Computer Science",
    status: "Available",
    availableSeats: 15,
    registered: false,
    color: "#3b82f6",
  },
  {
    id: 102,
    code: "CS420",
    title: "Machine Learning",
    instructor: "Dr. Ada Lovelace",
    credits: 4,
    schedule: "Tue, Thu 2:00 PM - 3:45 PM",
    location: "Engineering Hall 205",
    department: "Computer Science",
    status: "Available",
    availableSeats: 5,
    registered: false,
    color: "#8b5cf6",
  },
  {
    id: 103,
    code: "CS450",
    title: "Operating Systems",
    instructor: "Prof. Dennis Ritchie",
    credits: 4,
    schedule: "Mon, Wed, Fri 11:00 AM - 12:15 PM",
    location: "Computer Science Building 110",
    department: "Computer Science",
    status: "Available",
    availableSeats: 0,
    registered: false,
    color: "#ec4899",
  },
  {
    id: 104,
    code: "MATH340",
    title: "Differential Equations",
    instructor: "Dr. Katherine Johnson",
    credits: 3,
    schedule: "Tue, Thu 10:00 AM - 11:15 AM",
    location: "Math Building 205",
    department: "Mathematics",
    status: "Available",
    availableSeats: 20,
    registered: false,
    color: "#f59e0b",
  },
  {
    id: 105,
    code: "PHYS301",
    title: "Quantum Mechanics",
    instructor: "Dr. Richard Feynman",
    credits: 4,
    schedule: "Mon, Wed 1:00 PM - 2:45 PM",
    location: "Science Building 310",
    department: "Physics",
    status: "Available",
    availableSeats: 12,
    registered: false,
    color: "#10b981",
  },
  {
    id: 106,
    code: "ENG310",
    title: "Advanced Technical Writing",
    instructor: "Prof. Margaret Atwood",
    credits: 3,
    schedule: "Fri 1:00 PM - 3:45 PM",
    location: "Liberal Arts 405",
    department: "English",
    status: "Available",
    availableSeats: 25,
    registered: false,
    color: "#6366f1",
  },
  {
    id: 107,
    code: "BIO201",
    title: "Molecular Biology",
    instructor: "Dr. Rosalind Franklin",
    credits: 4,
    schedule: "Tue, Thu 1:00 PM - 2:45 PM",
    location: "Life Sciences 201",
    department: "Biology",
    status: "Available",
    availableSeats: 18,
    registered: false,
    color: "#14b8a6",
  },
  {
    id: 108,
    code: "CHEM301",
    title: "Organic Chemistry",
    instructor: "Dr. Marie Curie",
    credits: 4,
    schedule: "Mon, Wed, Fri 9:00 AM - 10:15 AM",
    location: "Chemistry Building 105",
    department: "Chemistry",
    status: "Available",
    availableSeats: 10,
    registered: false,
    color: "#f43f5e",
  },
]

// Create context
interface DashboardContextType {
  studentData: Student
  availableCourses: Course[]
  registerForCourse: (courseId: number) => void
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

  const registerForCourse = (courseId: number) => {
    // Update available courses
    setAvailableCourses((prevCourses) =>
        prevCourses.map((course) =>
            course.id === courseId
                ? {
                  ...course,
                  registered: true,
                  availableSeats: (course.availableSeats || 0) - 1,
                }
                : course,
        ),
    )

    // Find the course
    const course = availableCourses.find((c) => c.id === courseId)

    if (course) {
      // Add to enrolled courses
      const newCourse: Course = {
        ...course,
        status: "In Progress",
        grade: undefined,
        gradePercentage: 0,
      }

      setStudentData((prev) => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, newCourse],
        totalCredits: prev.totalCredits + course.credits,
      }))
    }
  }

  return (
      <DashboardContext.Provider value={{ studentData, availableCourses, registerForCourse }}>
        {children}
      </DashboardContext.Provider>
  )
}
