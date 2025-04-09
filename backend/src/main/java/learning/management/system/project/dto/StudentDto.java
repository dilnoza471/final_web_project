package learning.management.system.project.dto;

import lombok.*;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class StudentDto {

    private int student_id;
    private String name;
    private String address;
    private int level;

}