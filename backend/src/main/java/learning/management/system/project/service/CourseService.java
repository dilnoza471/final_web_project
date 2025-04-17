package learning.management.system.project.service;

import learning.management.system.project.dto.CourseDTO;
import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.exception.ResourceNotFoundException;

import java.util.List;

public interface CourseService {
    String saveCourse(CourseDTO courseDto);

    List<StudentDto> getAllCourses();

    StudentDto addCourse(CourseDTO courseDto);

    StudentDto getCourseById(int id);

    StudentDto updateCourse(int id, CourseDTO courseDto) throws ResourceNotFoundException;

    String deleteCourseById(int id);
}
