"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, PlusCircle, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { Course } from "../../types/dashboard"
import { DashboardContext } from "../../context/dashboard-context"

interface AvailableCoursesProps {
  courses: Course[]
  onRegister: (courseId: number, sectionId: string) => void
}

export function AvailableCourses({ courses, onRegister }: AvailableCoursesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const { hasScheduleConflict, getRegisteredCoursesCount } = DashboardContext.useContext()

  // Get unique departments
  const departments = Array.from(new Set(courses.map((course) => course.department)))

  // Filter courses based on search and department
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Check if student has reached the maximum number of courses
  const hasMaxCourses = getRegisteredCoursesCount() >= 5

  return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedDepartment || ""}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>



        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Credits
              </th>
              <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Section A
              </th>
              <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Section B
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No courses found matching your criteria
                  </td>
                </tr>
            ) : (
                filteredCourses.map((course, index) => (
                    <motion.tr
                        key={course.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{course.code}</div>
                            <div className="text-sm text-gray-500">{course.title}</div>
                            <div className="text-xs text-gray-400 mt-1">Instructor: {course.instructor}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>

                      {/* Section A */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.sections && course.sections[0] && (
                            <div className="space-y-2 p-2 border border-gray-100 rounded-md hover:bg-gray-50">
                              <div className="text-sm font-medium text-gray-900">Option 1: {course.sections[0].schedule}</div>
                              <div className="text-xs text-gray-500">{course.sections[0].location}</div>
                              <div className="flex items-center justify-between">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  (course.sections[0].availableSeats) > 10
                                      ? "bg-green-100 text-green-800"
                                      : course.sections[0].availableSeats > 0
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                              }`}
                          >
                            {course.sections[0].availableSeats > 0
                                ? `${course.sections[0].availableSeats} seats left`
                                : "Full"}
                          </span>
                                <button
                                    onClick={() => onRegister(course.id, course.sections[0].sectionId)}
                                    disabled={
                                        course.sections[0].availableSeats === 0 ||
                                        course.sections[0].registered ||
                                        hasMaxCourses ||
                                        hasScheduleConflict(course.sections[0].schedule)
                                    }
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                                        course.sections[0].registered
                                            ? "bg-green-100 text-green-800 cursor-default"
                                            : course.sections[0].availableSeats === 0
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : hasMaxCourses
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : hasScheduleConflict(course.sections[0].schedule)
                                                        ? "bg-red-100 text-red-800 cursor-not-allowed"
                                                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                    }`}
                                    title={
                                      course.sections[0].registered
                                          ? "Already registered"
                                          : course.sections[0].availableSeats === 0
                                              ? "No seats available"
                                              : hasMaxCourses
                                                  ? "Maximum courses reached"
                                                  : hasScheduleConflict(course.sections[0].schedule)
                                                      ? "Schedule conflict"
                                                      : "Register for this section"
                                    }
                                >
                                  {course.sections[0].registered ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Registered
                                      </>
                                  ) : course.sections[0].availableSeats === 0 ? (
                                      <>
                                        <Clock className="h-4 w-4 mr-1" />
                                        Waitlist
                                      </>
                                  ) : hasScheduleConflict(course.sections[0].schedule) ? (
                                      <>
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        Conflict
                                      </>
                                  ) : (
                                      <>
                                        <PlusCircle className="h-4 w-4 mr-1" />
                                        Register
                                      </>
                                  )}
                                </button>
                              </div>
                            </div>
                        )}
                      </td>

                      {/* Section B */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {course.sections && course.sections[1] && (
                            <div className="space-y-2 p-2 border border-gray-100 rounded-md hover:bg-gray-50">
                              <div className="text-sm font-medium text-gray-900">Option 2: {course.sections[1].schedule}</div>
                              <div className="text-xs text-gray-500">{course.sections[1].location}</div>
                              <div className="flex items-center justify-between">
                          <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  (course.sections[1].availableSeats) > 10
                                      ? "bg-green-100 text-green-800"
                                      : course.sections[1].availableSeats > 0
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                              }`}
                          >
                            {course.sections[1].availableSeats > 0
                                ? `${course.sections[1].availableSeats} seats left`
                                : "Full"}
                          </span>
                                <button
                                    onClick={() => onRegister(course.id, course.sections[1].sectionId)}
                                    disabled={
                                        course.sections[1].availableSeats === 0 ||
                                        course.sections[1].registered ||
                                        hasMaxCourses ||
                                        hasScheduleConflict(course.sections[1].schedule)
                                    }
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                                        course.sections[1].registered
                                            ? "bg-green-100 text-green-800 cursor-default"
                                            : course.sections[1].availableSeats === 0
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : hasMaxCourses
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                    : hasScheduleConflict(course.sections[1].schedule)
                                                        ? "bg-red-100 text-red-800 cursor-not-allowed"
                                                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                    }`}
                                    title={
                                      course.sections[1].registered
                                          ? "Already registered"
                                          : course.sections[1].availableSeats === 0
                                              ? "No seats available"
                                              : hasMaxCourses
                                                  ? "Maximum courses reached"
                                                  : hasScheduleConflict(course.sections[1].schedule)
                                                      ? "Schedule conflict"
                                                      : "Register for this section"
                                    }
                                >
                                  {course.sections[1].registered ? (
                                      <>
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Registered
                                      </>
                                  ) : course.sections[1].availableSeats === 0 ? (
                                      <>
                                        <Clock className="h-4 w-4 mr-1" />
                                        Waitlist
                                      </>
                                  ) : hasScheduleConflict(course.sections[1].schedule) ? (
                                      <>
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        Conflict
                                      </>
                                  ) : (
                                      <>
                                        <PlusCircle className="h-4 w-4 mr-1" />
                                        Register
                                      </>
                                  )}
                                </button>
                              </div>
                            </div>
                        )}
                      </td>
                    </motion.tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default AvailableCourses
