package learning.management.system.project.service;

import learning.management.system.project.dto.CourseDTO;
import learning.management.system.project.exception.ResourceNotFoundException;

import java.util.List;

public interface CourseService {

    List<CourseDTO> getAllCourses();

    CourseDTO addCourse(CourseDTO courseDto);

    CourseDTO getCourseById(Long id) throws ResourceNotFoundException;

    CourseDTO updateCourse(Long id, CourseDTO courseDto) throws ResourceNotFoundException;

    String deleteCourseById(Long id);
}
