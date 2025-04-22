package learning.management.system.project.service;

import learning.management.system.project.dto.EnrollmentRequestDTO;
import learning.management.system.project.dto.EnrollmentResponseDTO;
import learning.management.system.project.entity.CourseEntity;
import learning.management.system.project.entity.EnrollmentEntity;
import learning.management.system.project.entity.StudentEntity;
import learning.management.system.project.repository.CourseRepository;
import learning.management.system.project.repository.EnrollmentRepository;
import learning.management.system.project.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    // Method to enroll a student in a course
    public EnrollmentResponseDTO enrollStudent(EnrollmentRequestDTO request) {
        // Fetching student and course using IDs
        StudentEntity student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + request.getStudentId()));

        CourseEntity course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + request.getCourseId()));

        // Create a new enrollment entity
        EnrollmentEntity enrollment = new EnrollmentEntity();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());

        // Save the enrollment
        enrollmentRepository.save(enrollment);

        // Return a response DTO with necessary information
        return new EnrollmentResponseDTO(
                enrollment.getStudent().getId(),
                enrollment.getCourse().getId(),
                enrollment.getEnrollmentDate()
        );
    }

    // Method to get all enrollments by student id
    public List<EnrollmentResponseDTO> getEnrollmentsByStudentId(Long studentId) {
        List<EnrollmentEntity> enrollments = enrollmentRepository.findByStudentId(studentId);

        return enrollments.stream()
                .map(enrollment -> new EnrollmentResponseDTO(
                        enrollment.getStudent().getId(),
                        enrollment.getCourse().getId(),
                        enrollment.getEnrollmentDate()))
                .collect(Collectors.toList());
    }

}
