package com.developerex.server.term;

import com.developerex.server.room.RoomRepository;
import com.developerex.server.room.model.Room;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.term.model.Term;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TermService {
    private final TermRepository termRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public List<TermDto> getAllTerms() {
        return termRepository.findAll()
                .stream()
                .map(TermMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TermDto addTerm(TermDto termDto) {
        Term term = TermMapper.mapToEntity(termDto);
        Room room = roomRepository.findById(termDto.roomId()).orElseThrow(() -> new EntityNotFoundException("No room found with id: " + termDto.roomId()));
        term.setRoom(room);

        if (term.getStartDateTime().isBefore(java.time.LocalDateTime.now())) {
            return null;
        }

        // check if terms overlap
        List<Term> terms = termRepository.findAllByRoomId(termDto.roomId());
        for (Term t : terms) {
            if (t.getStartDateTime().isEqual(term.getStartDateTime()) && t.getStartDateTime().plusMinutes(t.getDuration()).isEqual(term.getStartDateTime().plusMinutes(term.getDuration()))) {
                return null;
            }
        }

        termRepository.save(term);

        return termDto;
    }
}
