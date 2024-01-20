package com.developerex.server.vote;

import com.developerex.server.vote.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Object> findByAttendeeIdAndTermId(Long attendeeId, Long termId);
}
