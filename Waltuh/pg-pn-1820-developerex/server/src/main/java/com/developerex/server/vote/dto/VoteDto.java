package com.developerex.server.vote.dto;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.vote.model.VoteType;
import lombok.Builder;


@Builder
public record VoteDto(
        VoteType voteType,
        TermDto term,
        AttendeeDto attendee
) {
}
