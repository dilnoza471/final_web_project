package learning.management.system.project.controller;

import learning.management.system.project.dto.CourseDTO;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // Save a new course
    @PostMapping("/add")
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        CourseDTO result = courseService.addCourse(courseDTO);
        return ResponseEntity.ok(result);
    }

    // Get all courses
    @GetMapping("/get-all-courses")
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        List<CourseDTO> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Get course by ID
    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) throws ResourceNotFoundException {
        CourseDTO course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    // Update course by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<CourseDTO> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) throws ResourceNotFoundException {
        CourseDTO result = courseService.updateCourse(id, courseDTO);
        return ResponseEntity.ok(result);
    }

    // Delete course by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        String result = courseService.deleteCourseById(id);
        return ResponseEntity.ok(result);
    }
}
