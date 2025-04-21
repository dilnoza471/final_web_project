"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Calendar, GraduationCap, BarChart3, Bell, Search, AlertCircle } from "lucide-react"

import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { CourseCard } from "./course-card"
import { GradesSummary } from "./grades-summary"
import { UpcomingAssignments } from "./upcoming-assignments"
import { AvailableCourses } from "./available-courses"
import { Schedule } from "./schedule"
import { DashboardContext, DashboardProvider } from "../../context/dashboard-context"

export function StudentDashboard() {
  return (
      <DashboardProvider>
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader />
          <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto">
              <DashboardContent />
            </main>
          </div>
        </div>
      </DashboardProvider>
  )
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-800"
          >
            Student Dashboard
          </motion.h1>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
              />
            </div>
            <button className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "overview"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Overview
              </button>
              <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "courses"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                My Courses
              </button>
              <button
                  onClick={() => setActiveTab("grades")}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "grades"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Grades
              </button>
              <button
                  onClick={() => setActiveTab("schedule")}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "schedule"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Schedule
              </button>
              <button
                  onClick={() => setActiveTab("registration")}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === "registration"
                          ? "border-b-2 border-blue-500 text-blue-600"
                          : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Course Registration
              </button>
            </nav>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "courses" && <CoursesTab />}
            {activeTab === "grades" && <GradesTab />}
            {activeTab === "schedule" && <Schedule />}
            {activeTab === "registration" && <RegistrationTab />}
          </div>
        </div>
      </div>
  )
}

function OverviewTab() {
  const { studentData } = DashboardContext.useContext()

  return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-100">Current Semester</p>
                <h3 className="text-2xl font-bold mt-1">Fall 2025</h3>
                <p className="mt-2 text-blue-100">GPA: {studentData.currentGPA.toFixed(2)}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-purple-100">Enrolled Courses</p>
                <h3 className="text-2xl font-bold mt-1">{studentData.enrolledCourses.length}</h3>
                <p className="mt-2 text-purple-100">{studentData.totalCredits} Credit Hours</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-amber-100">Upcoming Deadlines</p>
                <h3 className="text-2xl font-bold mt-1">{studentData.upcomingAssignments.length}</h3>
                <p className="mt-2 text-amber-100">Next: {studentData.upcomingAssignments[0]?.dueDate}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Current Courses</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="p-4 grid gap-4 md:grid-cols-2">
              {studentData.enrolledCourses.slice(0, 4).map((course) => (
                  <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Upcoming Assignments</h3>
            </div>
            <div className="p-4">
              <UpcomingAssignments assignments={studentData.upcomingAssignments.slice(0, 5)} />
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Grade Summary</h3>
          </div>
          <div className="p-4">
            <GradesSummary grades={studentData.enrolledCourses} />
          </div>
        </motion.div>
      </div>
  )
}

function CoursesTab() {
  const { studentData } = DashboardContext.useContext()

  return (
      <div className="space-y-6">
        {studentData.enrolledCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mb-2 text-gray-300" />
              <p>You are not registered for any courses yet.</p>
              <p className="text-sm">Visit the Course Registration tab to register for courses.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentData.enrolledCourses.map((course) => (
                  <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * course.id }}
                  >
                    <CourseCard course={course} detailed />
                  </motion.div>
              ))}
            </div>
        )}
      </div>
  )
}

function GradesTab() {
  const { studentData } = DashboardContext.useContext()

  return (
      <div className="space-y-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Current Semester Grades</h3>
          </div>
          <div className="p-4">
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
                    Credits
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {studentData.enrolledCourses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{course.code}</div>
                            <div className="text-sm text-gray-500">{course.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.credits}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{course.grade || "N/A"}</div>
                        <div className="text-sm text-gray-500">
                          {course.gradePercentage ? `${course.gradePercentage}%` : "In Progress"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              course.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : course.status === "In Progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {course.status}
                      </span>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">GPA Trend</h3>
          </div>
          <div className="p-4 h-64 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <BarChart3 className="h-24 w-24 text-gray-300" />
              <p className="text-gray-500 ml-4">GPA visualization would appear here</p>
            </div>
          </div>
        </motion.div>
      </div>
  )
}

// Update the RegistrationTab to show a more informative message about course registration
function RegistrationTab() {
  const { availableCourses, registerForCourse, getRegisteredCoursesCount } = DashboardContext.useContext()
  const registeredCount = getRegisteredCoursesCount()

  return (
      <div className="space-y-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-r border-l-4 ${
                registeredCount >= 4 ? "bg-amber-50 border-amber-400" : "bg-blue-50 border-blue-400"
            }`}
        >
          <div className="flex">
            {registeredCount >= 4 ? (
                <AlertCircle className="h-5 w-5 text-amber-400" />
            ) : (
                <Calendar className="h-5 w-5 text-blue-400" />
            )}
            <div className="ml-3">
              <p className="text-sm font-medium">
                {registeredCount === 5
                    ? "You have reached the maximum of 5 courses. You cannot register for additional courses."
                    : registeredCount === 0
                        ? "You are not registered for any courses. You can register for up to 5 courses."
                        : `You are registered for ${registeredCount} ${
                            registeredCount === 1 ? "course" : "courses"
                        }. You can register for ${5 - registeredCount} more.`}
              </p>
              <p className="text-sm mt-1">
                Each course offers two session options. Choose the one that best fits your schedule.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Available Courses for Registration</h3>
          </div>
          <div className="p-4">
            <AvailableCourses courses={availableCourses} onRegister={registerForCourse} />
          </div>
        </motion.div>
      </div>
  )
}
