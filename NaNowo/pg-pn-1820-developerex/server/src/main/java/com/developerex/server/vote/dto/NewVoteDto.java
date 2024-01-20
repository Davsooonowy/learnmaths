package com.developerex.server.vote.dto;

import com.developerex.server.vote.model.VoteType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class NewVoteDto {
    private String voteType;
    private Long termId;
    private Long attendeeId;
}
