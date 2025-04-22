import type { Student, Course } from "../../types/dashboard";
import axios from 'axios';


// Update the mock student data to have only one enrolled course initially
export const mockStudent: Student = {
    id: "S12345678",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    major: "Computer Science",
    year: 3,
    currentGPA: 3.75,
    totalCredits: 3, // Updated to reflect only one course
    enrolledCourses: [
        // Only one course initially enrolled
        {
            id: 3,
            code: "MATH240",
            title: "Linear Algebra",
            instructor: "Dr. Emily Watson",
            credits: 3,
            schedule: "Wed 2:00 PM - 3:15 PM",
            location: "Math Building 110",
            department: "Mathematics",
            status: "In Progress",
            grade: "A",
            gradePercentage: 95,
            color: "#ec4899",
            sectionId: "MATH240-A",
        },
    ],
    upcomingAssignments: [
        {
            id: 3,
            title: "Matrix Transformations Quiz",
            courseCode: "MATH240",
            dueDate: "2025-05-08",
            description: "Online quiz covering eigenvalues, eigenvectors, and matrix transformations.",
        },
        {
            id: 6,
            title: "Midterm Exam",
            courseCode: "MATH240",
            dueDate: "2025-05-25",
            description: "Midterm exam covering all topics from weeks 1-7.",
        },
    ],
};

// Static courses (10 courses) - This will be our default export
export const mockAvailableCourses: Course[] = [
    {
        id: 101,
        code: "CS401",
        title: "Artificial Intelligence",
        instructor: "Dr. Alan Turing",
        credits: 3,
        department: "Computer Science",
        status: "Available",
        color: "#3b82f6",
        sections: [
            {
                sectionId: "CS401-A",
                schedule: "Mon 9:00 AM - 11:00 AM",
                location: "Computer Science Building 301",
                availableSeats: 15,
                registered: false,
            },
            {
                sectionId: "CS401-B",
                schedule: "Wed 2:00 PM - 4:00 PM",
                location: "Computer Science Building 305",
                availableSeats: 12,
                registered: false,
            },
        ],
    },
    {
        id: 102,
        code: "CS420",
        title: "Machine Learning",
        instructor: "Dr. Ada Lovelace",
        credits: 4,
        department: "Computer Science",
        status: "Available",
        color: "#8b5cf6",
        sections: [
            {
                sectionId: "CS420-A",
                schedule: "Tue 9:00 AM - 11:00 AM",
                location: "Engineering Hall 205",
                availableSeats: 5,
                registered: false,
            },
            {
                sectionId: "CS420-B",
                schedule: "Thu 2:00 PM - 4:00 PM",
                location: "Engineering Hall 210",
                availableSeats: 8,
                registered: false,
            },
        ],
    },
    {
        id: 103,
        code: "CS450",
        title: "Operating Systems",
        instructor: "Prof. Dennis Ritchie",
        credits: 4,
        department: "Computer Science",
        status: "Available",
        color: "#ec4899",
        sections: [
            {
                sectionId: "CS450-A",
                schedule: "Mon 12:00 PM - 2:00 PM",
                location: "Computer Science Building 110",
                availableSeats: 0,
                registered: false,
            },
            {
                sectionId: "CS450-B",
                schedule: "Wed 4:00 PM - 6:00 PM",
                location: "Computer Science Building 115",
                availableSeats: 3,
                registered: false,
            },
        ],
    },
    {
        id: 104,
        code: "MATH340",
        title: "Differential Equations",
        instructor: "Dr. Katherine Johnson",
        credits: 3,
        department: "Mathematics",
        status: "Available",
        color: "#f59e0b",
        sections: [
            {
                sectionId: "MATH340-A",
                schedule: "Tue 12:00 PM - 2:00 PM",
                location: "Math Building 205",
                availableSeats: 20,
                registered: false,
            },
            {
                sectionId: "MATH340-B",
                schedule: "Thu 9:00 AM - 11:00 AM",
                location: "Math Building 210",
                availableSeats: 15,
                registered: false,
            },
        ],
    },
    {
        id: 105,
        code: "PHYS301",
        title: "Quantum Mechanics",
        instructor: "Dr. Richard Feynman",
        credits: 4,
        department: "Physics",
        status: "Available",
        color: "#10b981",
        sections: [
            {
                sectionId: "PHYS301-A",
                schedule: "Mon 2:00 PM - 4:00 PM",
                location: "Science Building 310",
                availableSeats: 12,
                registered: false,
            },
            {
                sectionId: "PHYS301-B",
                schedule: "Fri 12:00 PM - 2:00 PM",
                location: "Science Building 315",
                availableSeats: 10,
                registered: false,
            },
        ],
    },
    {
        id: 106,
        code: "ENG310",
        title: "Advanced Technical Writing",
        instructor: "Prof. Margaret Atwood",
        credits: 3,
        department: "English",
        status: "Available",
        color: "#6366f1",
        sections: [
            {
                sectionId: "ENG310-A",
                schedule: "Wed 9:00 AM - 11:00 AM",
                location: "Liberal Arts 405",
                availableSeats: 25,
                registered: false,
            },
            {
                sectionId: "ENG310-B",
                schedule: "Fri 2:00 PM - 4:00 PM",
                location: "Liberal Arts 410",
                availableSeats: 22,
                registered: false,
            },
        ],
    },
    {
        id: 107,
        code: "BIO201",
        title: "Molecular Biology",
        instructor: "Dr. Rosalind Franklin",
        credits: 4,
        department: "Biology",
        status: "Available",
        color: "#14b8a6",
        sections: [
            {
                sectionId: "BIO201-A",
                schedule: "Tue 2:00 PM - 4:00 PM",
                location: "Life Sciences 201",
                availableSeats: 18,
                registered: false,
            },
            {
                sectionId: "BIO201-B",
                schedule: "Thu 12:00 PM - 2:00 PM",
                location: "Life Sciences 205",
                availableSeats: 15,
                registered: false,
            },
        ],
    },
    {
        id: 108,
        code: "CHEM301",
        title: "Organic Chemistry",
        instructor: "Dr. Marie Curie",
        credits: 4,
        department: "Chemistry",
        status: "Available",
        color: "#f43f5e",
        sections: [
            {
                sectionId: "CHEM301-A",
                schedule: "Mon 4:00 PM - 6:00 PM",
                location: "Chemistry Building 105",
                availableSeats: 10,
                registered: false,
            },
            {
                sectionId: "CHEM301-B",
                schedule: "Wed 12:00 PM - 2:00 PM",
                location: "Chemistry Building 110",
                availableSeats: 8,
                registered: false,
            },
        ],
    },
    {
        id: 109,
        code: "PSYC201",
        title: "Cognitive Psychology",
        instructor: "Dr. Jean Piaget",
        credits: 3,
        department: "Psychology",
        status: "Available",
        color: "#a855f7",
        sections: [
            {
                sectionId: "PSYC201-A",
                schedule: "Tue 4:00 PM - 6:00 PM",
                location: "Psychology Building 201",
                availableSeats: 22,
                registered: false,
            },
            {
                sectionId: "PSYC201-B",
                schedule: "Thu 4:00 PM - 6:00 PM",
                location: "Psychology Building 205",
                availableSeats: 20,
                registered: false,
            },
        ],
    },
    {
        id: 110,
        code: "ECON210",
        title: "Microeconomics",
        instructor: "Dr. Adam Smith",
        credits: 3,
        department: "Economics",
        status: "Available",
        color: "#0ea5e9",
        sections: [
            {
                sectionId: "ECON210-A",
                schedule: "Fri 9:00 AM - 11:00 AM",
                location: "Business Building 301",
                availableSeats: 30,
                registered: false,
            },
            {
                sectionId: "ECON210-B",
                schedule: "Fri 4:00 PM - 6:00 PM",
                location: "Business Building 305",
                availableSeats: 25,
                registered: false,
            },
        ],
    },
];

/**
 * Fetches all available courses from the API and formats them to match the expected structure
 */
export async function fetchAvailableCourses(): Promise<Course[]> {
    try {
        console.log("Fetching all available courses...");
        const response = await axios.get('http://localhost:8080/api/courses/get-all-courses');
        const coursesData = response.data;
        console.log(`Successfully fetched ${coursesData.length} courses`);

        // Process each course to fetch its sessions and format the data
        const formattedCourses = await Promise.all(
            coursesData.map(async (course: any): Promise<Course> => {
                // Fetch sessions for this course
                let sections = [];
                try {
                    console.log(`Fetching sessions for course ${course.id}...`);
                    const sessionsResponse = await axios.get(`http://localhost:8080/api/courses/${course.id}/sessions`);
                    const sessionsData = sessionsResponse.data;

                    // Format sessions to match the expected section structure
                    sections = sessionsData.map((session: any) => {
                        // Format the schedule string from day and time information
                        const schedule = `${session.day} ${session.startTime.substring(0, 5)} - ${session.endTime.substring(0, 5)}`;

                        return {
                            sectionId: `${course.code}-${session.sessionId}`,
                            schedule: schedule,
                            location: course.location || "Location not specified",
                            availableSeats: course.available_seats || 0,
                            registered: false,
                        };
                    });

                    console.log(`Processed ${sections.length} sessions for course ${course.id}`);
                } catch (error) {
                    console.error(`Error fetching sessions for course ${course.id}:`, error);
                    // If sessions fetch fails, create a default section from course data
                    sections = [{
                        sectionId: `${course.code}-A`,
                        schedule: "Schedule not available",
                        location: course.location || "Location not specified",
                        availableSeats: course.available_seats || 0,
                        registered: false
                    }];
                }

                // Return the formatted course with its sections
                return {
                    id: course.id,
                    code: course.code,
                    title: course.title,
                    instructor: course.instructor,
                    credits: course.credits,
                    department: course.department,
                    status: (course.available_seats > 0) ? "Available" : "Full",
                    color: course.color || getRandomColor(course.code),
                    sections: sections
                };
            })
        );

        console.log("All courses processed successfully");
        return formattedCourses;
    } catch (error) {
        console.error('Failed to fetch available courses:', error);
        // Return the static mock data as fallback
        return mockAvailableCourses;
    }
}

// Helper function to generate a consistent color based on course code
function getRandomColor(seed: string): string {
    // Generate a hash from the course code
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to hex color
    const colors = [
        "#3b82f6", // blue
        "#8b5cf6", // purple
        "#ec4899", // pink
        "#f59e0b", // amber
        "#10b981", // emerald
        "#6366f1", // indigo
        "#14b8a6", // teal
        "#f43f5e", // rose
        "#a855f7", // violet
        "#0ea5e9", // sky
    ];

    // Use the hash to select a color
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}

// Try to update the courses with API data, but keep using the static data if it fails
(async () => {
    try {
        const apiCourses = await fetchAvailableCourses();
        if (apiCourses && apiCourses.length > 0) {
            // We could update mockAvailableCourses here, but it's better to keep it as a constant
            // and let the context decide whether to use the API data or the mock data
            console.log("Successfully fetched courses from API");
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
})();