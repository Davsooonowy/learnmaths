package com.developerex.server.vote.mapper;

import com.developerex.server.attendee.mapper.AttendeeMapper;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.vote.dto.NewVoteDto;
import com.developerex.server.vote.dto.VoteDto;
import com.developerex.server.vote.model.Vote;
import com.developerex.server.vote.model.VoteType;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;


@Service
public class VoteMapper {
    public static VoteDto mapToDto(Vote vote) {
        return VoteDto.builder()
                .voteType(vote.getVoteType())
                .term(TermMapper.mapToDto(vote.getTerm()))
                .attendee(AttendeeMapper.mapToDto(vote.getAttendee()))
                .build();
    }

    public static Vote mapToEntity(VoteDto voteDto) {
        return Vote.builder()
                .voteType(voteDto.voteType())
                .term(TermMapper.mapToEntity(voteDto.term()))
                .attendee(AttendeeMapper.mapToEntity(voteDto.attendee()))
                .build();
    }

}

