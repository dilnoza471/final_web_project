package learning.management.system.project.entity;

import lombok.*;
import jakarta.persistence.*;

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
    private int sid;

    @Column(name = "name",length = 50,nullable = false)
    private String name;

    @Column(name = "address",length = 200,nullable = false)
    private String address;

    @Column(name="level",length = 1,nullable = false) //year of study, e.g. 4-th year student
    private int tel;

}
