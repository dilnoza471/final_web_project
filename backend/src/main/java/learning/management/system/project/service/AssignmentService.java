package learning.management.system.project.service;

import learning.management.system.project.dto.AssignmentDTO;

import java.util.List;

public interface AssignmentService {
    List<AssignmentDTO> getAssignmentsByStudentId(Long studentId);
}
