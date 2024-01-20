package com.developerex.server.room;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.attendee.mapper.AttendeeMapper;
import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.room.dto.RoomDto;
import com.developerex.server.room.mapper.RoomMapper;
import com.developerex.server.room.model.Room;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.term.model.Term;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class RoomMapperTest {

    @Test
    void mapToDto() {
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 12, 7, 15, 30);

        Room room = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .build();

        var owner = Attendee.builder()
                .id(1L)
                .build();

        var term1 = Term.builder()
                .id(1L)
                .room(room)
                .build();

        var term2 = Term.builder()
                .id(2L)
                .room(room)
                .build();

        var participant1 = Attendee.builder()
                .id(1L)
                .build();

        var participant2 = Attendee.builder()
                .id(2L)
                .build();

        //given
        var entity = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .terms(List.of(term1, term2))
                .owner(owner)
                .participants(Set.of(participant1, participant2))
                .build();

        var expectedDto = RoomDto.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .terms(List.of(
                        TermMapper.mapToDto(term1),
                        TermMapper.mapToDto(term2)))
                .owner(AttendeeMapper.mapToDto(owner))
                .participants(List.of(
                        AttendeeMapper.mapToDto(participant1),
                        AttendeeMapper.mapToDto(participant2)))
                .build();

        //when
        var actualDto = RoomMapper.mapToDto(entity);

        //then
        assertAll(
                () -> assertEquals(expectedDto.id(), actualDto.id()),
                () -> assertEquals(expectedDto.title(), actualDto.title()),
                () -> assertEquals(expectedDto.description(), actualDto.description()),
                () -> assertEquals(expectedDto.deadline(), actualDto.deadline()),
                () -> {
                    for (TermDto term : expectedDto.terms()) {
                        assertThat(actualDto.terms(), hasItem(term));
                    }
                },
                () -> {
                    for (AttendeeDto participant : expectedDto.participants()) {
                        assertThat(actualDto.participants(), hasItem(participant));
                    }
                },
                () -> assertEquals(expectedDto.owner(), actualDto.owner())
        );
    }

    @Test
    void mapToEntity() {
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 12, 7, 15, 30);

        //given
        var owner = AttendeeDto.builder()
                .id(1L)
                .build();

        var term1 = TermDto.builder()
                .id(1L)
                .build();

        var term2 = TermDto.builder()
                .id(2L)
                .build();

        var participant1 = AttendeeDto.builder()
                .id(1L)
                .build();

        var participant2 = AttendeeDto.builder()
                .id(2L)
                .build();

        var dto = RoomDto.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .terms(List.of(term1, term2))
                .owner(owner)
                .participants(List.of(participant1))
                .build();

        var expectedEntity = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .terms(List.of(
                        TermMapper.mapToEntity(term1),
                        TermMapper.mapToEntity(term2)))
                .owner(AttendeeMapper.mapToEntity(owner))
                .participants(Set.of(
                        AttendeeMapper.mapToEntity(participant1)))
                .build();

        //when
        var actualEntity = RoomMapper.mapToEntity(dto);

        //then
        assertAll(
                () -> assertEquals(expectedEntity.getTitle(), actualEntity.getTitle()),
                () -> assertEquals(expectedEntity.getDescription(), actualEntity.getDescription()),
                () -> assertEquals(expectedEntity.getDeadline(), actualEntity.getDeadline()),
                () -> assertEquals(expectedEntity.getOwner(), actualEntity.getOwner()),
                () -> {
                    for (Term term : expectedEntity.getTerms()) {
                        assertThat(actualEntity.getTerms(), hasItem(term));
                    }
                },
                () -> {
                    for (Attendee participant : expectedEntity.getParticipants()) {
                        assertThat(actualEntity.getParticipants(), hasItem(participant));
                    }
                }

        );
    }
}