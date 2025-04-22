import { useContext, createContext, useState } from "react";
import type React from "react";
import { mockStudent, mockAvailableCourses } from "../components/dashboard/mock-data";
import { checkScheduleOverlap } from "../utils/schedule-utils";
import type { Student, Course } from "../types/dashboard";

// Create context
interface DashboardContextType {
  studentData: Student;
  availableCourses: Course[];
  registerForCourse: (courseId: number, sectionId: string) => void;
  hasScheduleConflict: (newSchedule: string) => boolean;
  getRegisteredCoursesCount: () => number;
}

const DashboardContextInstance = createContext<DashboardContextType | null>(null);

export const DashboardContext = {
  Provider: DashboardContextInstance.Provider,
  useContext: () => {
    const context = useContext(DashboardContextInstance);
    if (!context) {
      throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
  },
};

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [studentData, setStudentData] = useState<Student>(mockStudent);
  const [availableCourses, setAvailableCourses] = useState<Course[]>(mockAvailableCourses);

  const hasScheduleConflict = (newSchedule: string): boolean => {
    return studentData.enrolledCourses.some((course) => checkScheduleOverlap(course.schedule, newSchedule));
  };

  // Helper function to get the number of registered courses
  const getRegisteredCoursesCount = (): number => {
    return studentData.enrolledCourses.length;
  };

  const registerForCourse = (courseId: number, sectionId: string) => {
    // Find the course
    const course = availableCourses.find((c) => c.id === courseId);
    if (!course || !course.sections) return;

    // Find the section
    const section = course.sections.find((s) => s.sectionId === sectionId);
    if (!section) return;

    // Check if student already has 5 courses
    if (studentData.enrolledCourses.length >= 5) {
      alert("You cannot register for more than 5 courses.");
      return;
    }

    // Check for schedule conflicts
    if (hasScheduleConflict(section.schedule)) {
      alert("This course conflicts with your existing schedule.");
      return;
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
                  };
                }
                return s;
              }),
            };
          }
          return c;
        })
    );

    // Add to enrolled courses
    const newCourse: Course = {
      ...course,
      schedule: section.schedule,
      location: section.location,
      status: "In Progress",
      grade: undefined,
      gradePercentage: 0,
      sectionId: section.sectionId,
    };

    setStudentData((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, newCourse],
      totalCredits: prev.totalCredits + course.credits,
    }));
  };

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
  );
}
