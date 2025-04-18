package learning.management.system.project.controller;


import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.exception.ResourceNotFoundException;
import learning.management.system.project.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String saveStudent(@RequestBody StudentDto studentDto){
        return studentService.saveStudent(studentDto);
    }
    @PostMapping("save")
    public StudentDto addStudent(@RequestBody StudentDto studentDto){
        return studentService.addStudent(studentDto);
    }
    @GetMapping(
            path = "/get-all-student"
    )
    public List<StudentDto> getAllStudents(){
        return studentService.getAllStudents();
    }
    @GetMapping(
            path = "/get-by-id",
            params = "id"
    )
    public StudentDto getStudentById(@RequestParam(value = "id") Long id){
        return studentService.getStudentById(id);
        //path variable also can use instead of request param//
    }
    @PutMapping(
            path = "/update",
            params = "id"
    )
    public StudentDto updateStudentById(@RequestParam(value = "id")Long Sid,@RequestBody StudentDto studentDto) throws ResourceNotFoundException {
        return studentService.updateStudent(Sid,studentDto);
    }
    @DeleteMapping(
            path = "delete-student/{id}"
    )
    public String deleteStudent(@PathVariable(value = "id") Long Sid){
        return studentService.deleteStudentById(Sid);
    }


}