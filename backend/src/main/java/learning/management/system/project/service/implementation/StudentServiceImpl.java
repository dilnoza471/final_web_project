package learning.management.system.project.service.implementation;

import learning.management.system.project.dto.StudentDto;
import learning.management.system.project.entity.StudentEntity;
import learning.management.system.project.repository.StudentRepository;
import learning.management.system.project.service.StudentService;
import learning.management.system.project.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public String saveStudent(StudentDto studentDto) {
        StudentEntity student=new StudentEntity(
                studentDto.getStudent_id(),
                studentDto.getName(),
                studentDto.getAddress(),
                studentDto.getLevel()
        );
        studentRepository.save(student);
        return "student"+studentDto.getName()+" added successfully!!!";
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<StudentEntity> getStudents=studentRepository.findAll();
        List<StudentDto> studentDtoList=new ArrayList<>();
        for(StudentEntity student : getStudents){
            StudentDto studentTo=new StudentDto(
                    student.getStudent_id(),
                    student.getName(),
                    student.getAddress(),
                    student.getLevel()

            );
            studentDtoList.add(studentTo);
        }
        return studentDtoList;
    }

    @Override
    public StudentDto addStudent(StudentDto studentDto) {
        StudentEntity student=new StudentEntity(
                studentDto.getStudent_id(),
                studentDto.getName(),
                studentDto.getAddress(),
                studentDto.getLevel()
        );
        studentRepository.save(student);
        return studentDto;
    }

    @Override
    public StudentDto getStudentById(int id) {
        if(studentRepository.existsById(id)){
            StudentEntity stuEntity = studentRepository.getReferenceById(id);
            return new StudentDto(
                    stuEntity.getStudent_id(),
                    stuEntity.getName(),
                    stuEntity.getAddress(),
                    stuEntity.getLevel()
            );
        }
        else {
            throw new RuntimeException("no student related to input id");
        }
    }

    @Override
    public StudentDto updateStudent(int id, StudentDto studentDto) throws ResourceNotFoundException {
        StudentEntity updateStudent=studentRepository.findById(id)
                .orElseThrow(() ->new ResourceNotFoundException("Student not exist with id: " + id));

        updateStudent.setName(studentDto.getName());
        updateStudent.setAddress(studentDto.getAddress());
        updateStudent.setLevel(studentDto.getLevel());
        studentRepository.save(updateStudent);
        return studentDto;
    }



    @Override
    public String deleteStudentById(int id) {
        if(studentRepository.existsById(id)){
            studentRepository.deleteById(id);
            return "student deleted successfully!!!";
        }else{
            throw new RuntimeException("no student with that id");
        }
    }
}