package learning.management.system.project.service;

import learning.management.system.project.dto.SessionDTO;
import learning.management.system.project.entity.SessionEntity;
import learning.management.system.project.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;

    public List<SessionDTO> getSessionsByCourseId(Long courseId) {
        // Fetch sessions by course ID
        List<SessionEntity> sessions = sessionRepository.findByCourseId(courseId);

        // Map to DTOs
        return sessions.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private SessionDTO mapToDTO(SessionEntity entity) {
        SessionDTO dto = new SessionDTO();
        dto.setSessionId(entity.getSessionId());
        dto.setType(entity.getType());
        dto.setDay(entity.getDay());
        dto.setStartTime(entity.getStart_time());
        dto.setEndTime(entity.getEndTime());
        return dto;
    }
}
