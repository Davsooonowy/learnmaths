package com.developerex.server.room.dto;

import java.time.LocalDateTime;
import java.util.List;

public record NewRoomDto (
    String title,
    String description,
    LocalDateTime deadline,
    Long owner,
    List<Long> terms,
    List<String> participants){
}
