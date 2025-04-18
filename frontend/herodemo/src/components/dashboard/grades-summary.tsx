"use client"

import { motion } from "framer-motion"
import type { Course } from "../../types/dashboard"

interface GradesSummaryProps {
  grades: Course[]
}

export function GradesSummary({ grades }: GradesSummaryProps) {
  // Calculate GPA
  const completedCourses = grades.filter((course) => course.grade)
  const totalPoints = completedCourses.reduce((acc, course) => {
    const gradePoints = getGradePoints(course.grade || "")
    return acc + gradePoints * course.credits
  }, 0)
  const totalCredits = completedCourses.reduce((acc, course) => acc + course.credits, 0)
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A"

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-4 text-center"
        >
          <h4 className="text-sm font-medium text-blue-700">Current GPA</h4>
          <p className="text-2xl font-bold text-blue-900 mt-1">{gpa}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-lg p-4 text-center"
        >
          <h4 className="text-sm font-medium text-green-700">A Grades</h4>
          <p className="text-2xl font-bold text-green-900 mt-1">
            {grades.filter((course) => course.grade && course.grade.startsWith("A")).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 rounded-lg p-4 text-center"
        >
          <h4 className="text-sm font-medium text-yellow-700">B Grades</h4>
          <p className="text-2xl font-bold text-yellow-900 mt-1">
            {grades.filter((course) => course.grade && course.grade.startsWith("B")).length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 rounded-lg p-4 text-center"
        >
          <h4 className="text-sm font-medium text-purple-700">Credits Earned</h4>
          <p className="text-2xl font-bold text-purple-900 mt-1">
            {completedCourses.reduce((acc, course) => acc + course.credits, 0)}
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        {grades.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center"
          >
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {course.code}: {course.title}
                </span>
                <span className="text-sm font-medium text-gray-900">{course.grade || "In Progress"}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${course.gradePercentage || 0}%`,
                    backgroundColor: getGradeColor(course.grade || ""),
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function getGradePoints(grade: string): number {
  switch (grade) {
    case "A+":
      return 4.0
    case "A":
      return 4.0
    case "A-":
      return 3.7
    case "B+":
      return 3.3
    case "B":
      return 3.0
    case "B-":
      return 2.7
    case "C+":
      return 2.3
    case "C":
      return 2.0
    case "C-":
      return 1.7
    case "D+":
      return 1.3
    case "D":
      return 1.0
    case "F":
      return 0.0
    default:
      return 0.0
  }
}

function getGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "#22c55e"
  if (grade.startsWith("B")) return "#3b82f6"
  if (grade.startsWith("C")) return "#f59e0b"
  if (grade.startsWith("D")) return "#f97316"
  if (grade.startsWith("F")) return "#ef4444"
  return "#94a3b8"
}
