package com.developerex.server.room.dto;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.vote.dto.VoteDto;
import lombok.Builder;

import java.util.HashMap;
import java.util.List;

@Builder
public record RoomInfoDto (
    AttendeeDto owner,

    List<AttendeeDto> participants,

    HashMap<TermDto, Long> votesPerTerm,

    List<VoteDto> allVotes) {

}
