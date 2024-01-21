package com.developerex.server.room.dto;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.model.Term;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record RoomDto (
        Long id,
    String title,
    String description,
    LocalDateTime deadline,
    AttendeeDto owner,
    List<TermDto> terms,
    List<AttendeeDto> participants){
}
