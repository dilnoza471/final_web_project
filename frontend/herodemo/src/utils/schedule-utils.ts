// Create a utility file for schedule-related functions
import type { Course } from "../types/dashboard"

/**
 * Parses a schedule string and extracts day and time information
 */
export function parseSchedule(scheduleString: string | undefined) {
    if (!scheduleString) return null

    const scheduleInfo = scheduleString.toLowerCase()

    // Extract days
    const days: string[] = []
    if (scheduleInfo.includes("mon")) days.push("Monday")
    if (scheduleInfo.includes("tue")) days.push("Tuesday")
    if (scheduleInfo.includes("wed")) days.push("Wednesday")
    if (scheduleInfo.includes("thu")) days.push("Thursday")
    if (scheduleInfo.includes("fri")) days.push("Friday")

    // Extract time
    const timeRegex = /(\d+):(\d+)\s*(AM|PM)\s*-\s*(\d+):(\d+)\s*(AM|PM)/i
    const timeMatch = scheduleInfo.match(timeRegex)

    if (!timeMatch) return { days, startTime: null, endTime: null }

    const startHour = Number.parseInt(timeMatch[1])
    const startMinute = Number.parseInt(timeMatch[2])
    const startAmPm = timeMatch[3].toLowerCase()
    const endHour = Number.parseInt(timeMatch[4])
    const endMinute = Number.parseInt(timeMatch[5])
    const endAmPm = timeMatch[6].toLowerCase()

    // Convert to 24-hour format
    const startHour24 =
        startAmPm === "pm" && startHour !== 12 ? startHour + 12 : startAmPm === "am" && startHour === 12 ? 0 : startHour

    const endHour24 = endAmPm === "pm" && endHour !== 12 ? endHour + 12 : endAmPm === "am" && endHour === 12 ? 0 : endHour

    return {
        days,
        startTime: {
            hour: startHour,
            minute: startMinute,
            amPm: startAmPm,
            hour24: startHour24,
            totalMinutes: startHour24 * 60 + startMinute,
        },
        endTime: {
            hour: endHour,
            minute: endMinute,
            amPm: endAmPm,
            hour24: endHour24,
            totalMinutes: endHour24 * 60 + endMinute,
        },
    }
}

/**
 * Checks if two schedules overlap
 */
export function checkScheduleOverlap(schedule1: string | undefined, schedule2: string | undefined): boolean {
    const parsed1 = parseSchedule(schedule1)
    const parsed2 = parseSchedule(schedule2)

    if (!parsed1 || !parsed2 || !parsed1.startTime || !parsed1.endTime || !parsed2.startTime || !parsed2.endTime) {
        return false
    }

    // Check if any days overlap
    const daysOverlap = parsed1.days.some((day) => parsed2.days.includes(day))
    if (!daysOverlap) return false

    // Check if times overlap
    const start1 = parsed1.startTime.totalMinutes
    const end1 = parsed1.endTime.totalMinutes
    const start2 = parsed2.startTime.totalMinutes
    const end2 = parsed2.endTime.totalMinutes

    return (start1 >= start2 && start1 < end2) || (end1 > start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2)
}

/**
 * Gets courses for a specific day and time slot
 */
export function getCoursesForTimeSlot(courses: Course[], day: string, timeSlot: string): Course[] {
    const slotInfo = parseSchedule(timeSlot)
    if (!slotInfo || !slotInfo.startTime || !slotInfo.endTime) return []

    return courses.filter((course) => {
        const courseInfo = parseSchedule(course.schedule)
        if (!courseInfo || !courseInfo.startTime || !courseInfo.endTime) return false

        // Check if the day matches
        if (!courseInfo.days.includes(day)) return false

        // Check for time overlap
        const courseStart = courseInfo.startTime.totalMinutes
        const courseEnd = courseInfo.endTime.totalMinutes
        const slotStart = slotInfo.startTime.totalMinutes
        const slotEnd = slotInfo.endTime.totalMinutes

        return (
            (courseStart >= slotStart && courseStart < slotEnd) ||
            (courseEnd > slotStart && courseEnd <= slotEnd) ||
            (courseStart <= slotStart && courseEnd >= slotEnd)
        )
    })
}

/**
 * Formats a time string in 12-hour format
 */
export function formatTime(hour: number, minute: number): string {
    const amPm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${amPm}`
}
