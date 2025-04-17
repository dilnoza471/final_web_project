package learning.management.system.project.entity;

import lombok.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "students")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "student_id",length = 40)
    private int student_id;

    @Column(name = "name",length = 50,nullable = false)
    private String name;

    @Column(name = "address",length = 200)
    private String address;

    @Column(name="level",length = 1) //year of study, e.g. 4-th year student
    private int level;

    @ManyToMany
    List<CourseEntity> courses;


}
