package learning.management.system.project.service.implementation;

import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.entity.StudentEntity;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.repository.StudentRepository;
import learning.management.system.project.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    @Transactional
    public String saveStudent(StudentDto studentDto) {
        StudentEntity student = mapToEntity(studentDto);
        studentRepository.save(student);
        return "Student '" + studentDto.getName() + "' added successfully!";
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<StudentEntity> students = studentRepository.findAll();
        return students.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudentDto addStudent(StudentDto studentDto) {
        StudentEntity student = mapToEntity(studentDto);
        StudentEntity savedStudent = studentRepository.save(student);
        return mapToDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long id) throws ResourceNotFoundException {
        StudentEntity student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return mapToDto(student);
    }

    @Override
    @Transactional
    public StudentDto updateStudent(Long id, StudentDto studentDto) throws ResourceNotFoundException {
        StudentEntity existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        existingStudent.setName(studentDto.getName());
        existingStudent.setEmail(studentDto.getEmail());
        existingStudent.setMajor(studentDto.getMajor());
        existingStudent.setYear(studentDto.getYear());
        existingStudent.setCurrent_gpa(studentDto.getCurrent_gpa());
        existingStudent.setTotal_credits(studentDto.getTotal_credits());
        existingStudent.setEnrollments(studentDto.getEnrollments());
        existingStudent.setAssignments(studentDto.getAssignments());
        StudentEntity updatedStudent = studentRepository.save(existingStudent);
        return mapToDto(updatedStudent);
    }

    @Override
    @Transactional
    public String deleteStudentById(Long id) throws ResourceNotFoundException {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
        return "Student deleted successfully!";
    }

    // Helper methods for mapping
    private StudentDto mapToDto(StudentEntity entity) {
        return new StudentDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getMajor(),
                entity.getYear(),
                entity.getCurrent_gpa(),
                entity.getTotal_credits(),
                entity.getEnrollments(),
                entity.getAssignments()
        );
    }

    private StudentEntity mapToEntity(StudentDto dto) {
        return new StudentEntity(
                dto.getId(),
                dto.getName(),
                dto.getEmail(),
                dto.getMajor(),
                dto.getYear(),
                dto.getCurrent_gpa(),
                dto.getTotal_credits(),
                dto.getEnrollments(),
                dto.getAssignments()
        );
    }
}
