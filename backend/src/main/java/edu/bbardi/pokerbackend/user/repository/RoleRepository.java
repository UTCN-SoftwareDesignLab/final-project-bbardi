package edu.bbardi.pokerbackend.user.repository;

import edu.bbardi.pokerbackend.user.model.ERole;
import edu.bbardi.pokerbackend.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole role);
}
