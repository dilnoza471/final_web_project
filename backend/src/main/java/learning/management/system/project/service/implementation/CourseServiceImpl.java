package learning.management.system.project.service.implementation;

import learning.management.system.project.dto.CourseDTO;
import learning.management.system.project.entity.CourseEntity;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.repository.CourseRepository;
import learning.management.system.project.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    private CourseDTO mapToDTO(CourseEntity entity) {
        CourseDTO dto = new CourseDTO();
        dto.setId(entity.getId());
        dto.setCode(entity.getCode());
        dto.setTitle(entity.getTitle());
        dto.setInstructor(entity.getInstructor());
        dto.setCredits(entity.getCredits());
        dto.setLocation(entity.getLocation());
        dto.setDepartment(entity.getDepartment());
        dto.setColor(entity.getColor());
        dto.setAvailable_seats(entity.getAvailable_seats());
        dto.setEnrollments(entity.getEnrollments());
        dto.setSessions(entity.getSessions());
        return dto;
    }

    private CourseEntity mapToEntity(CourseDTO dto) {
        CourseEntity entity = new CourseEntity();
        entity.setId(dto.getId());
        entity.setCode(dto.getCode());
        entity.setTitle(dto.getTitle());
        entity.setInstructor(dto.getInstructor());
        entity.setCredits(dto.getCredits());
        entity.setLocation(dto.getLocation());
        entity.setDepartment(dto.getDepartment());
        entity.setColor(dto.getColor());
        entity.setAvailable_seats(dto.getAvailable_seats());
        entity.setEnrollments(dto.getEnrollments());
        entity.setSessions(dto.getSessions());
        return entity;
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        List<CourseEntity> courses = courseRepository.findAll();
        return courses.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public CourseDTO addCourse(CourseDTO courseDto) {
        CourseEntity course = mapToEntity(courseDto);
        CourseEntity savedCourse = courseRepository.save(course);
        return mapToDTO(savedCourse);
    }

    @Override
    public CourseDTO getCourseById(Long id) throws ResourceNotFoundException {
        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToDTO(course);
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO courseDto) throws ResourceNotFoundException {
        CourseEntity existing = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        existing.setCode(courseDto.getCode());
        existing.setTitle(courseDto.getTitle());
        existing.setInstructor(courseDto.getInstructor());
        existing.setCredits(courseDto.getCredits());
        existing.setLocation(courseDto.getLocation());
        existing.setDepartment(courseDto.getDepartment());
        existing.setColor(courseDto.getColor());
        existing.setAvailable_seats(courseDto.getAvailable_seats());
        existing.setEnrollments(courseDto.getEnrollments());
        existing.setSessions(courseDto.getSessions());
        CourseEntity updated = courseRepository.save(existing);
        return mapToDTO(updated);
    }

    @Override
    public String deleteCourseById(Long id) {
        CourseEntity course = null;
        try {
            course = courseRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        } catch (ResourceNotFoundException e) {
            return "Course not found with id: " + id;
        }
        courseRepository.delete(course);
        return "Course deleted successfully.";
    }
}
