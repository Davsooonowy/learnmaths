package com.developerex.server.term.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TermDto(
        Long id,
        LocalDateTime startDateTime,
        int duration,
        Long roomId
        ) {
}
