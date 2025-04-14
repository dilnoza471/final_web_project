package learning.management.system.project.service;

import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.exception.ResourceNotFoundException;

import java.util.List;

public interface StudentService {
    String saveStudent(StudentDto studentDto);

    List<StudentDto> getAllStudents();

    StudentDto addStudent(StudentDto studentDto);

    StudentDto getStudentById(int id);

    StudentDto updateStudent(int id, StudentDto studentDto) throws ResourceNotFoundException;

    String deleteStudentById(int id);
}