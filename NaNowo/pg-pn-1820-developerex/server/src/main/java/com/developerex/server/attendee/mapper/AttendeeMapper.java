package com.developerex.server.attendee.mapper;


import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.attendee.model.Attendee;

public class AttendeeMapper  {

    public static AttendeeDto mapToDto(Attendee attendee) {
        return AttendeeDto.builder()
                .email(attendee.getEmail())
                .username(attendee.getUsername())
                .password(attendee.getPassword())
                .id(attendee.getId())
                .build();
    }

    public static Attendee mapToEntity(AttendeeDto attendeeDto) {
        return Attendee.builder()
                .email(attendeeDto.email())
                .username(attendeeDto.username())
                .password(attendeeDto.password())
                .build();
    }
}
