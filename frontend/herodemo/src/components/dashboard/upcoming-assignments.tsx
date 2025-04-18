"use client"

import { motion } from "framer-motion"
import type { Assignment } from "../../types/dashboard"

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  return (
    <div className="space-y-3">
      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No upcoming assignments</p>
      ) : (
        assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-start p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
              {assignment.courseCode.substring(0, 2)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
              <p className="text-xs text-gray-500">
                {assignment.courseCode} • Due {assignment.dueDate}
              </p>
            </div>
            <div className={`px-2 py-1 text-xs rounded-full ${getDueDateColor(assignment.dueDate)}`}>
              {getRelativeDueDate(assignment.dueDate)}
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}

function getRelativeDueDate(dueDate: string): string {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "Overdue"
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays < 7) return `${diffDays} days`
  return dueDate
}

function getDueDateColor(dueDate: string): string {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "bg-red-100 text-red-800"
  if (diffDays <= 1) return "bg-amber-100 text-amber-800"
  if (diffDays <= 3) return "bg-yellow-100 text-yellow-800"
  return "bg-green-100 text-green-800"
}
