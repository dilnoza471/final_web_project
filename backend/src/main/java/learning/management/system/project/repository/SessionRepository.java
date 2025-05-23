package learning.management.system.project.repository;

import learning.management.system.project.entity.AssignmentEntity;
import learning.management.system.project.entity.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {
    List<SessionEntity> findByCourseId(Long courseId);

}