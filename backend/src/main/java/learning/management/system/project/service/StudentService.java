package learning.management.system.project.service;

import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.exception.ResourceNotFoundException;

import java.util.List;

public interface StudentService {

    /**
     * Saves a new student and returns a confirmation message.
     *
     * @param studentDto the student data to save
     * @return a confirmation message
     */
    String saveStudent(StudentDto studentDto);

    /**
     * Retrieves a list of all students.
     *
     * @return a list of StudentDto
     */
    List<StudentDto> getAllStudents();

    /**
     * Adds a student and returns the saved student data.
     *
     * @param studentDto the student data to add
     * @return the saved StudentDto
     */
    StudentDto addStudent(StudentDto studentDto);

    /**
     * Gets a student by their ID.
     *
     * @param id the student's ID
     * @return the corresponding StudentDto
     * @throws ResourceNotFoundException if the student is not found
     */
    StudentDto getStudentById(Long id) throws ResourceNotFoundException;

    /**
     * Updates a student with the given ID using the provided data.
     *
     * @param id         the student's ID
     * @param studentDto the updated student data
     * @return the updated StudentDto
     * @throws ResourceNotFoundException if the student is not found
     */
    StudentDto updateStudent(Long id, StudentDto studentDto) throws ResourceNotFoundException;

    /**
     * Deletes a student by their ID.
     *
     * @param id the student's ID
     * @return a confirmation message
     * @throws ResourceNotFoundException if the student is not found
     */
    String deleteStudentById(Long id) throws ResourceNotFoundException;
}
