package learning.management.system.project.dto;

import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CourseDTO {
    private Long course_id;
    private String courseCode;     // e.g., "CS201"
    private String name;           // e.g., "Data Structures"
    private int credits;
    private String prof;

}
