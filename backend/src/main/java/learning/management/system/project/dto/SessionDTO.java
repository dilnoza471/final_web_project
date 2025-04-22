package learning.management.system.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class SessionDTO {
    private Long sessionId;
    private String type; // LECTURE or LAB
    private String day;
    private LocalTime startTime;
    private LocalTime endTime;
}
