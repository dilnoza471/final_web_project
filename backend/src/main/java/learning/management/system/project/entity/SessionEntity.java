package learning.management.system.project.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "sessions")
public class SessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;
    @Column(name = "type")
    private String type; // LECTURE or LAB
    @Column(name = "day")
    private String day;
    @Column(name = "start_time")
    private LocalTime start_time;
    @Column(name = "end_time")
    private LocalTime endTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    // getters and setters
}
