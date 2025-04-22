package learning.management.system.project.service.implementation;

import learning.management.system.project.dto.AssignmentDTO;
import learning.management.system.project.entity.AssignmentEntity;
import learning.management.system.project.repository.AssignmentRepository;
import learning.management.system.project.repository.SessionRepository;
import learning.management.system.project.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Override
    public List<AssignmentDTO> getAssignmentsByStudentId(Long studentId) {
        List<AssignmentEntity> assignments = assignmentRepository.findByStudentId(studentId);

        return assignments.stream()
                .map(assignment -> new AssignmentDTO(
                        assignment.getId(),
                        assignment.getDue_date(),
                        assignment.getStatus(),
                        assignment.getTitle(),
                        assignment.getCourse().getId() ,
                        assignment.getStudent().getId(),
                        assignment.getDescription()
                ))
                .collect(Collectors.toList());
    }
}
