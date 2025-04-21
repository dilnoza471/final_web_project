package learning.management.system.project.entity;

import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class AssignmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;//assignmentID
    //id, student_id, course_code, title, due_date, description

    @Column(name = "title")
    private String title;
    @Column(name = "dueDate")
    private LocalDate dueDate;
    @Column(name = "status") //Completed, In Progress, Missed
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private StudentEntity student;

}
