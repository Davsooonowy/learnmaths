package com.developerex.server.attendee;

import com.developerex.server.attendee.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
    Optional<Attendee> findByUsername(String username);

    Optional<Attendee> findByEmail(String email);
}