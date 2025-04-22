package learning.management.system.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {
    private Long id;
    private LocalDate due_date;
    private String status;
    private String title;
    private Long course_id;
    private Long student_id;
    private String description;


}

