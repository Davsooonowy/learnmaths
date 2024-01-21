package com.developerex.server.term;

import com.developerex.server.room.model.Room;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.term.model.Term;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TermMapperTest {

    @Test
    void mapToDto() {
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 12, 7, 15, 30);
        Room room = Room.builder()
                .id(1L)
                .title("title")
                .description("description")
                .deadline(specificDateTime)
                .build();

        //given
        var entity = Term.builder()
                .id(1L)
                .room(room)
                .startDateTime(specificDateTime)
                .duration(10)
                .build();

        var expectedDto = TermDto.builder()
                .id(1L)
                .startDateTime(specificDateTime)
                .duration(10)
                .build();

        //when
        var actualDto = TermMapper.mapToDto(entity);

        //then
        assertAll(
                () -> assertEquals(expectedDto.id(), actualDto.id()),
                () -> assertEquals(expectedDto.startDateTime(), actualDto.startDateTime()),
                () -> assertEquals(expectedDto.duration(), actualDto.duration())
        );
    }

    @Test
    void mapToEntity() {
        LocalDateTime specificDateTime = LocalDateTime.of(2023, 12, 7, 15, 30);

        //given
        var dto = TermDto.builder()
                .id(1L)
                .startDateTime(specificDateTime)
                .duration(10)
                .build();

        var expectedEntity = Term.builder()
                .id(1L)
                .startDateTime(specificDateTime)
                .duration(10)
                .build();

        //when
        var actualEntity = TermMapper.mapToEntity(dto);

        //then
        assertAll(
                () -> assertEquals(expectedEntity.getStartDateTime(), actualEntity.getStartDateTime()),
                () -> assertEquals(expectedEntity.getDuration(), actualEntity.getDuration())
        );
    }
}