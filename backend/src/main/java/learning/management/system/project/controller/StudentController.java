package learning.management.system.project.controller;


import learning.management.system.project.dto.AssignmentDTO;
import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.service.AssignmentService;
import learning.management.system.project.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final AssignmentService assignmentService;


    @PostMapping("/add")
    public String saveStudent(@RequestBody StudentDto studentDto){
        return studentService.saveStudent(studentDto);
    }


    @GetMapping(path = "/get-all-students")
    public List<StudentDto> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping(path = "/get-by-id", params = "id")
    public StudentDto getStudentById(@RequestParam(value = "id") Long id) throws ResourceNotFoundException {
        return studentService.getStudentById(id);

    }

    @PutMapping(path = "/update", params = "id")
    public StudentDto updateStudentById(@RequestParam(value = "id")Long id, @RequestBody StudentDto studentDto) throws ResourceNotFoundException {
        return studentService.updateStudent(id,studentDto);
    }

    @DeleteMapping(path = "delete-student/{id}")
    public String deleteStudent(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        return studentService.deleteStudentById(id);
    }

    @GetMapping(path = "/get-hw/{id}")
    public List<AssignmentDTO> getAssignmentById(@PathVariable Long id) throws ResourceNotFoundException {
        return assignmentService.getAssignmentsByStudentId(id);

    }


}