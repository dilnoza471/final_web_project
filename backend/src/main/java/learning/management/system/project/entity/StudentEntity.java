package learning.management.system.project.entity;

import lombok.*;
import jakarta.persistence.*;

import java.util.ArrayList;
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
    @Column(name = "id",length = 40)
    private Long id;

    @Column(name = "name",length = 50,nullable = false)
    private String name;

    @Column(name = "email",length = 200)
    private String email;

    @Column(name="major")
    private String major;

    @Column(name = "year")
    private Integer year;

    @Column(name = "current_gpa")
    private Double current_gpa;

    @Column(name = "total_credits")
    private Integer total_credits;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EnrollmentEntity> enrollments;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<AssignmentEntity> assignments = new ArrayList<>();



}
