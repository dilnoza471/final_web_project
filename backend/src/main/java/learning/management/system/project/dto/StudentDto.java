package learning.management.system.project.dto;

import learning.management.system.project.entity.AssignmentEntity;
import learning.management.system.project.entity.EnrollmentEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class StudentDto {

    private Long id;
    private String name;
    private String email;
    private String major;
    private Integer year;
    private double current_gpa;
    private Integer total_credits;
    private List<EnrollmentEntity> enrollments;
    private List<AssignmentEntity> assignments;
}
