package com.developerex.server.attendee.dto;


import lombok.Builder;

@Builder
public record AttendeeDto(
        Long id,
     String username,
     String email,
     String password
)
{
}
