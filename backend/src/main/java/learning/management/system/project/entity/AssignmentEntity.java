package learning.management.system.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name = "assignments")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;//assignmentID
    //id, student_id, course_code, title, due_date, description
    @Column(name = "due_date")
    private LocalDate due_date;
    @Column(name = "status")
    private String status;
    @Column(name = "title")
    private String title;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentEntity student;
    @Column(name = "description")
    private String description;

}
