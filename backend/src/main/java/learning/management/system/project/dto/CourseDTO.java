package learning.management.system.project.dto;
import learning.management.system.project.entity.EnrollmentEntity;
import learning.management.system.project.entity.SessionEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CourseDTO {
    private Long id;
    private String code;     // e.g., "CS201"
    private String title;   // e.g., "Data Structures"
    private String instructor;
    private int credits;
    private String location;
    private String department;
    private String color;
    private Integer available_seats;


    private List<SessionEntity> sessions;
}
