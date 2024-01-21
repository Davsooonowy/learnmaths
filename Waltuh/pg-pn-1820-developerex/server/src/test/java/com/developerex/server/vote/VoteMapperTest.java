package com.developerex.server.vote;

import com.developerex.server.attendee.mapper.AttendeeMapper;
import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.room.model.Room;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.term.model.Term;
import com.developerex.server.vote.dto.VoteDto;
import com.developerex.server.vote.mapper.VoteMapper;
import com.developerex.server.vote.model.Vote;
import com.developerex.server.vote.model.VoteType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class VoteMapperTest {

    @Test
    void mapToDto() {
        //given
        var attendee = Attendee.builder()
                .id(1L)
                .build();

        Room room = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .build();

        var term = Term.builder()
                .id(1L)
                .room(room)
                .build();

        var entity = Vote.builder()
                .id(1L)
                .voteType(VoteType.AVAILABLE)
                .attendee(attendee)
                .term(term)
                .build();


        var expectedDto = VoteDto.builder()
                .voteType(VoteType.AVAILABLE)
                .attendee(AttendeeMapper.mapToDto(attendee))
                .term(TermMapper.mapToDto(term))
                .build();

        //when
        var actualDto = VoteMapper.mapToDto(entity);

        //then
        assertAll(
                () -> assertEquals(expectedDto.voteType(), actualDto.voteType()),
                () -> assertEquals(expectedDto.attendee(), actualDto.attendee()),
                () -> assertEquals(expectedDto.term(), actualDto.term())
        );

    }

    @Test
    void mapToEntity() {
        //given
        var attendee = Attendee.builder()
                .id(1L)
                .build();

        Room room = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .build();

        var term = Term.builder()
                .id(1L)
                .room(room)
                .build();

        var dto = VoteDto.builder()
                .voteType(VoteType.AVAILABLE)
                .attendee(AttendeeMapper.mapToDto(attendee))
                .term(TermMapper.mapToDto(term))
                .build();

        var expectedEntity = Vote.builder()
                .voteType(VoteType.AVAILABLE)
                .attendee(attendee)
                .term(term)
                .build();

        //when
        var actualEntity = VoteMapper.mapToEntity(dto);

        //then
        assertAll(
                () -> assertEquals(expectedEntity.getVoteType(), actualEntity.getVoteType())
        );
    }
}