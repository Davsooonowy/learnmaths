package com.developerex.server.room;

import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.room.dto.EditRoomDto;
import com.developerex.server.room.dto.NewRoomDto;
import com.developerex.server.room.dto.RoomDto;
import com.developerex.server.room.dto.RoomInfoDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/get-owned-rooms/{userId}")
    public ResponseEntity<List<RoomDto>> getAllRoomsOwnedByUserId(@PathVariable Long userId) {
        List<RoomDto> rooms = roomService.getAllRoomsOwnedByUserId(userId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/get-participation-rooms/{userId}")
    public ResponseEntity<List<RoomDto>> getAllRoomsParticipatedByUserId(@PathVariable Long userId) {
        List<RoomDto> rooms = roomService.getAllRoomsParticipatedByUserId(userId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/get-room/{roomId}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long roomId) {
        RoomDto room = roomService.getRoomById(roomId);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @GetMapping("/get-room-attendees/{roomId}")
    public ResponseEntity<List<AttendeeDto>> getRoomAttendees(@PathVariable Long roomId) {
        List<AttendeeDto> attendees = roomService.getRoomAttendees(roomId);
        return new ResponseEntity<>(attendees, HttpStatus.OK);
    }

    @GetMapping("/get-room-info/{roomId}")
    public ResponseEntity<RoomInfoDto> getRoomVotesInfo(@PathVariable Long roomId) {
        RoomInfoDto rooms = roomService.getRoomInfo(roomId);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NewRoomDto> addRoom(@Valid @RequestBody NewRoomDto roomDto) {
        if (roomService.addRoom(roomDto)){
            return ResponseEntity.ok(roomDto);
        }
        return ResponseEntity.badRequest().build();
    }

    // FIXME: lepiej by było, gdyby id był w URL
    @PutMapping
    public ResponseEntity<EditRoomDto> editRoom(@Valid @RequestBody EditRoomDto roomDto) {
        EditRoomDto room = roomService.editRoom(roomDto);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }
}
