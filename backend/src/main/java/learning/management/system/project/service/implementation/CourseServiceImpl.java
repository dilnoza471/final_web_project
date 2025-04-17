package learning.management.system.project.service.implementation;

import learning.management.system.project.dto.CourseDTO;
import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.entity.CourseEntity;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.repository.CourseRepository;
import learning.management.system.project.service.CourseService;

import java.util.List;

public class CourseServiceImpl implements CourseService {
    private CourseRepository courseRepository;
    @Override
    public String saveCourse(CourseDTO courseDto) {
        courseRepository.save(
                new CourseEntity(courseDto.getCourse_id(),
                                courseDto.getName(),
                                courseDto.getCredits(),
                                courseDto.getCourse_id())
        )
        return "";
    }

    @Override
    public List<StudentDto> getAllCourses() {
        return List.of();
    }

    @Override
    public StudentDto addCourse(CourseDTO courseDto) {
        return null;
    }

    @Override
    public StudentDto getCourseById(int id) {
        return null;
    }

    @Override
    public StudentDto updateCourse(int id, CourseDTO courseDto) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public String deleteCourseById(int id) {
        return "";
    }
}
