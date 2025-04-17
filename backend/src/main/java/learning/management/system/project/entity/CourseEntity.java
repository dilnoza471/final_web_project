package learning.management.system.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "courses")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "courseID",length = 40)
    private Long course_id;
    @Column(name = "courseCode",length = 10,nullable = false)
    private String courseCode;     // e.g., "CS201"
    @Column(name = "name",length = 50,nullable = false)
    private String name;           // e.g., "Data Structures"
    @Column(name = "credits",nullable = false)
    private int credits;
    @Column(name = "finalGrade")
    private int finalGrade;

    // Relationships (to be implemented later)

    // One course can have many homework assignments
    @ManyToMany(mappedBy = "course", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<StudentEntity> students;

    // You might link grades through enrollments or submissions
    // e.g., One-to-many from Course -> Grade, or Course -> Enrollment



}
