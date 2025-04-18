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
        dto.setCourse_id(entity.getCourse_id());
        dto.setCourseCode(entity.getCourseCode());
        dto.setName(entity.getName());
        dto.setCredits(entity.getCredits());
        dto.setProf(entity.getProf());
        return dto;
    }

    private CourseEntity mapToEntity(CourseDTO dto) {
        CourseEntity entity = new CourseEntity();
        entity.setCourse_id(dto.getCourse_id());
        entity.setCourseCode(dto.getCourseCode());
        entity.setName(dto.getName());
        entity.setCredits(dto.getCredits());
        entity.setProf(dto.getProf());
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

        existing.setCourseCode(courseDto.getCourseCode());
        existing.setName(courseDto.getName());
        existing.setCredits(courseDto.getCredits());
        existing.setProf(courseDto.getProf());

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
