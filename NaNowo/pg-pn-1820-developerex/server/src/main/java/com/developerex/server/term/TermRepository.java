package com.developerex.server.term;

import com.developerex.server.term.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermRepository extends JpaRepository<Term, Long>{
    List<Term> findAllByRoomId(Long aLong);
}
