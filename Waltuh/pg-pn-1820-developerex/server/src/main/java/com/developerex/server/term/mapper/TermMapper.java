package com.developerex.server.term.mapper;


import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.model.Term;
import org.springframework.stereotype.Service;

@Service
public class TermMapper {
    public static TermDto mapToDto(Term term) {
        return TermDto.builder()
                .startDateTime(term.getStartDateTime())
                .duration(term.getDuration())
                .id(term.getId())
                .roomId(term.getRoom().getId())
                .build();
    }

    public static Term mapToEntity(TermDto termDto) {
        return Term.builder()
                .startDateTime(termDto.startDateTime())
                .duration(termDto.duration())
                .id(termDto.id())
                .build();
    }
    
}
