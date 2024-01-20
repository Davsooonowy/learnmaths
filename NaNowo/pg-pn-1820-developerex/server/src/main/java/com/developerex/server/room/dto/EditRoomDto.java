package com.developerex.server.room.dto;

import java.time.LocalDateTime;

public record EditRoomDto (
        Long id,
    String title,
    String description,
    LocalDateTime deadline
){}
