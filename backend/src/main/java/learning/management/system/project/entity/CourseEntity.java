package learning.management.system.project.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
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
    @Column(name = "id", length = 40)
    private Long id;
    @Column(name = "code", length = 10, nullable = false)
    private String code;     // e.g., "CS201"
    @Column(name = "title", length = 50, nullable = false)
    private String title;           // e.g., "Data Structures"
    @Column(name = "instructor")
    private String instructor;
    @Column(name = "credits", nullable = false)
    private int credits;
    @Column(name = "location", nullable = false)
    private String location;
    @Column(name = "department")
    private String department;
    @Column(name = "color", nullable = false)
    private String color;
    @Column(name = "available_seats")
    private Integer available_seats;

    // Relationships (to be implemented later)

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<SessionEntity> sessions = new ArrayList<>();



}
