package learning.management.system.project.dto;

import learning.management.system.project.entity.EnrollmentEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class StudentDto {

    private Long student_id;
    private String name;
    private String address;
    private Integer level;
    private List<EnrollmentEntity> enrollments;

}
