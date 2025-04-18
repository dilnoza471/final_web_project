"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Clock } from "lucide-react"
import type { Course } from "../../types/dashboard"

interface CourseCardProps {
  course: Course
  detailed?: boolean
}

export function CourseCard({ course, detailed = false }: CourseCardProps) {
  const progressPercentage: number = course.gradePercentage || 0

  return (
      <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div
            className="h-2"
            style={{
              background: course.color || "#3b82f6",
            }}
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{course.code}</p>
            </div>
            <span
                className={`px-2 py-1 text-xs rounded-full ${
                    course.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : course.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                }`}
            >
            {course.status}
          </span>
          </div>

          {detailed && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>{course.credits} Credits</span>
                </div>
              </div>
          )}

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }} />
            </div>
          </div>

          {course.grade && (
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-600">Current Grade:</span>
                <span className="font-semibold">{course.grade}</span>
              </div>
          )}
        </div>
      </motion.div>
  )
}
