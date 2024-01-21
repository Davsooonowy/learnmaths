package com.developerex.server.attendee;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.attendee.mapper.AttendeeMapper;
import com.developerex.server.attendee.model.Attendee;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AttendeeMapperTest {

    @Test
    void mapToDto() {
        //given
        var entity = Attendee.builder()
                .id(1L)
                .username("John")
                .email("example@example.com")
                .password("password")
                .build();

        var expectedDto = AttendeeDto.builder()
                .id(1L)
                .username("John")
                .email("example@example.com")
                .password("password")
                .build();

        //when
        var actualDto = AttendeeMapper.mapToDto(entity);

        //then
        assertAll(
                () -> assertEquals(expectedDto.id(), actualDto.id()),
                () -> assertEquals(expectedDto.username(), actualDto.username()),
                () -> assertEquals(expectedDto.email(), actualDto.email()),
                () -> assertEquals(expectedDto.password(), actualDto.password())
        );
    }

    @Test
    void mapToEntity() {
        //given
        var dto = AttendeeDto.builder()
                .id(1L)
                .username("John")
                .email("example@example.com")
                .password("password")
                .build();

        var expectedEntity = Attendee.builder()
                .id(1L)
                .username("John")
                .email("example@example.com")
                .password("password")
                .build();


        //when
        var actualEntity = AttendeeMapper.mapToEntity(dto);

        //then
        assertAll(
                () -> assertEquals(expectedEntity.getUsername(), actualEntity.getUsername()),
                () -> assertEquals(expectedEntity.getEmail(), actualEntity.getEmail()),
                () -> assertEquals(expectedEntity.getPassword(), actualEntity.getPassword())
        );
    }
}