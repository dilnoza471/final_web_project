"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Calendar, Share2, AlertCircle, BookOpen, FileDown } from "lucide-react"
import { DashboardContext } from "../../context/dashboard-context"
// Import the schedule utilities
import { getCoursesForTimeSlot } from "../../utils/schedule-utils"
import jsPDF from "jspdf"

export function Schedule() {
    const { studentData } = DashboardContext.useContext()
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [isDownloading, setIsDownloading] = useState(false)
    const scheduleRef = useRef<HTMLDivElement>(null)

    // Time slots for the schedule
    const timeSlots = ["9:00 AM - 11:00 AM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"]

    // Days of the week
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

    // Function to get courses for a specific day and time slot
    const getCoursesForSlot = (day: string, timeSlot: string) => {
        return getCoursesForTimeSlot(studentData.enrolledCourses, day, timeSlot)
    }

    const hasNoCourses = studentData.enrolledCourses.length === 0

    // Function to download the schedule as PDF
    const downloadScheduleAsPDF = async () => {
        if (!scheduleRef.current || hasNoCourses) return

        try {
            setIsDownloading(true)

            // Create a simpler PDF without using html2canvas
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4",
            })

            // Add title
            pdf.setFontSize(18)
            pdf.setTextColor(0, 0, 0)
            pdf.text(`${studentData.name}'s Class Schedule - Fall 2025`, 14, 20)

            // Add student info
            pdf.setFontSize(12)
            pdf.text(`Student ID: ${studentData.id} | Major: ${studentData.major} | Year: ${studentData.year}`, 14, 30)

            // Add current date
            const today = new Date().toLocaleDateString()
            pdf.text(`Generated on: ${today}`, 14, 40)

            // Add schedule table header
            pdf.setFillColor(240, 240, 240)
            pdf.rect(14, 50, 270, 10, "F")
            pdf.setFontSize(10)
            pdf.setTextColor(0, 0, 0)

            // Column headers
            pdf.text("Course Code", 16, 56)
            pdf.text("Course Title", 50, 56)
            pdf.text("Instructor", 120, 56)
            pdf.text("Schedule", 170, 56)
            pdf.text("Location", 230, 56)

            // Add courses
            let yPos = 66
            studentData.enrolledCourses.forEach((course, index) => {
                // Alternate row colors for readability
                if (index % 2 === 0) {
                    pdf.setFillColor(250, 250, 250)
                    pdf.rect(14, yPos - 6, 270, 10, "F")
                }

                pdf.text(course.code || "", 16, yPos)
                pdf.text(course.title || "", 50, yPos)
                pdf.text(course.instructor || "", 120, yPos)
                pdf.text(course.schedule || "", 170, yPos)
                pdf.text(course.location || "Room TBA", 230, yPos)

                yPos += 10
            })

            // Add a note if there are no courses
            if (studentData.enrolledCourses.length === 0) {
                pdf.text("No courses registered for this semester.", 14, 66)
            }

            // Add footer
            pdf.setFontSize(8)
            pdf.setTextColor(100, 100, 100)
            pdf.text(
                "University Portal - This document is for informational purposes only.",
                14,
                pdf.internal.pageSize.height - 10,
            )

            // Download the PDF
            pdf.save(`${studentData.name.replace(/\s+/g, "_")}_schedule_fall_2025.pdf`)
        } catch (error) {
            console.error("Error generating PDF:", error)
            alert("There was an error generating your PDF. Please try again.")
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-gray-800"
                >
                    Weekly Schedule
                </motion.h2>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 py-1 rounded-md text-sm ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"}`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1 rounded-md text-sm ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"}`}
                        >
                            List View
                        </button>
                    </div>
                    <button
                        className={`p-2 rounded-lg ${isDownloading ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors flex items-center gap-1`}
                        onClick={downloadScheduleAsPDF}
                        disabled={isDownloading || hasNoCourses}
                        title={hasNoCourses ? "No courses to download" : "Download schedule as PDF"}
                    >
                        {isDownloading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs">Downloading...</span>
                            </>
                        ) : (
                            <>
                                <FileDown className="h-4 w-4" />
                                <span className="text-xs">PDF</span>
                            </>
                        )}
                    </button>
                    <button className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                        <Share2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {hasNoCourses && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r"
                >
                    <div className="flex">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                You are not registered for any courses yet. Visit the Course Registration tab to register for courses.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                ref={scheduleRef}
            >
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Fall 2025 Schedule</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Current Week</span>
                    </div>
                </div>

                {viewMode === "grid" ? (
                    <div className="p-4 overflow-x-auto">
                        <div className="min-w-[800px]">
                            {/* Schedule Grid */}
                            <div className="grid grid-cols-6 gap-2">
                                {/* Header Row with Days */}
                                <div className="bg-gray-50 p-3 font-medium text-gray-500 border-b border-gray-200"></div>
                                {weekDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-50 p-3 font-medium text-gray-700 text-center border-b border-gray-200"
                                    >
                                        {day}
                                    </div>
                                ))}

                                {/* Time Slots and Course Cells */}
                                {timeSlots.map((timeSlot, timeIndex) => (
                                    <>
                                        {/* Time Slot Label */}
                                        <div
                                            key={`time-${timeIndex}`}
                                            className="bg-gray-50 p-3 font-medium text-gray-500 border-r border-gray-200"
                                        >
                                            {timeSlot}
                                        </div>

                                        {/* Course Cells for each day */}
                                        {weekDays.map((day, dayIndex) => {
                                            const coursesInSlot = getCoursesForSlot(day, timeSlot)

                                            return (
                                                <div
                                                    key={`${timeIndex}-${dayIndex}`}
                                                    className={`p-1 border border-gray-100 min-h-[100px] ${
                                                        coursesInSlot.length > 0 ? "bg-white" : "bg-gray-50"
                                                    }`}
                                                >
                                                    {coursesInSlot.map((course, courseIndex) => (
                                                        <div
                                                            key={courseIndex}
                                                            className="p-2 rounded-md mb-1 text-sm h-full"
                                                            style={{
                                                                backgroundColor: course.color ? `${course.color}20` : "#3b82f620",
                                                                borderLeft: `3px solid ${course.color || "#3b82f6"}`,
                                                            }}
                                                        >
                                                            <div className="font-medium" style={{ color: course.color || "#3b82f6" }}>
                                                                {course.code}
                                                            </div>
                                                            <div className="text-gray-700">{course.title}</div>
                                                            <div className="text-xs text-gray-500 mt-1">{course.location || "Room TBA"}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        })}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4">
                        {studentData.enrolledCourses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                                <AlertCircle className="h-12 w-12 mb-2 text-gray-300" />
                                <p>No courses scheduled yet.</p>
                                <p className="text-sm">Register for courses to see them in your schedule.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {studentData.enrolledCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg"
                                        style={{
                                            backgroundColor: course.color ? `${course.color}10` : "#3b82f610",
                                            borderLeft: `3px solid ${course.color || "#3b82f6"}`,
                                        }}
                                    >
                                        <div>
                                            <div className="flex items-center">
                        <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: course.color || "#3b82f6" }}
                        ></span>
                                                <span className="font-medium text-gray-900">
                          {course.code}: {course.title}
                        </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">Instructor: {course.instructor}</div>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <div className="text-sm font-medium text-gray-700">{course.schedule}</div>
                                            <div className="text-sm text-gray-500">{course.location || "Room TBA"}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            {studentData.enrolledCourses.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Schedule Legend</h3>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {studentData.enrolledCourses.map((course) => (
                                <div key={course.id} className="flex items-center">
                  <span
                      className="w-4 h-4 rounded-sm mr-2"
                      style={{ backgroundColor: course.color || "#3b82f6" }}
                  ></span>
                                    <span className="text-sm text-gray-700">
                    {course.code} - {course.title}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Schedule
