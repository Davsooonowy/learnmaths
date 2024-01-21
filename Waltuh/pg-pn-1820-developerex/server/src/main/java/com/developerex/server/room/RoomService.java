package com.developerex.server.room;

import com.developerex.server.attendee.AttendeeRepository;
import com.developerex.server.attendee.dto.AttendeeDto;
import com.developerex.server.attendee.mapper.AttendeeMapper;
import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.room.dto.EditRoomDto;
import com.developerex.server.room.dto.NewRoomDto;
import com.developerex.server.room.dto.RoomDto;
import com.developerex.server.room.dto.RoomInfoDto;
import com.developerex.server.room.mapper.RoomMapper;
import com.developerex.server.room.model.Room;
import com.developerex.server.term.TermRepository;
import com.developerex.server.term.dto.TermDto;
import com.developerex.server.term.mapper.TermMapper;
import com.developerex.server.term.model.Term;
import com.developerex.server.vote.dto.VoteDto;
import com.developerex.server.vote.mapper.VoteMapper;
import com.developerex.server.vote.model.Vote;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final AttendeeRepository attendeeRepository;

    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll()
                .stream()
                .map(RoomMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public boolean addRoom(NewRoomDto roomDto) {
        Room room = Room.builder()
                .title(roomDto.title())
                .description(roomDto.description())
                .deadline(roomDto.deadline())
                .terms( new ArrayList<Term>())
                .participants(roomDto.participants().stream().map(attendeeDto ->
                        attendeeRepository.findByEmail(attendeeDto).orElseThrow(() -> new EntityNotFoundException("No attendee found with email: " + attendeeDto))).collect(Collectors.toSet()))
                .build();

        room.setOwner(attendeeRepository.findById(roomDto.owner()).orElseThrow(() -> new EntityNotFoundException("No attendee found with id: " + roomDto.owner())));

        roomRepository.save(room);
        return true;
    }

    public List<RoomDto> getAllRoomsOwnedByUserId(Long userId) {
        return roomRepository.findAllByOwnerId(userId).orElseThrow(() -> new EntityNotFoundException("No rooms found for user with id: " + userId))
                .stream()
                .map(RoomMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public List<RoomDto> getAllRoomsParticipatedByUserId(Long userId) {
        return roomRepository.findAllByParticipantsId(userId).orElseThrow(() -> new EntityNotFoundException("No rooms found for user with id: " + userId))
                .stream()
                .map(RoomMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public RoomDto getRoomById(Long roomId) {
        return RoomMapper.mapToDto(roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("No room found with id: " + roomId)));
    }

    public List<AttendeeDto> getRoomAttendees(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("No room found with id: " + roomId))
                .getParticipants()
                .stream()
                .map(AttendeeMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public RoomInfoDto getRoomInfo(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EntityNotFoundException("No room found with id: " + roomId));


        AttendeeDto owner = AttendeeMapper.mapToDto(room.getOwner());

        List<AttendeeDto> participants = room.getParticipants()
                .stream()
                .map(AttendeeMapper::mapToDto)
                .toList();

        HashMap<TermDto, Long> votesPerTerm = new HashMap<>();

        for (Term term : room.getTerms()) {
            long votesForTermQuantity = term.getVotes().size();

            votesPerTerm.put(TermMapper.mapToDto(term), votesForTermQuantity);
        }

        List<VoteDto> allVotes = room.getTerms()
                .stream()
                .flatMap(term -> term.getVotes().stream())
                .map(VoteMapper::mapToDto)
                .toList();

        return RoomInfoDto.builder()
                .owner(owner)
                .participants(participants)
                .votesPerTerm(votesPerTerm)
                .allVotes(allVotes)
                .build();
    }

    public EditRoomDto editRoom(EditRoomDto data) {
        Room room = roomRepository.findById(data.id())
                .orElseThrow(() -> new EntityNotFoundException("No room found with id: " + data.id()));

        room.setTitle(data.title());
        room.setDescription(data.description());
        //room.setDeadline(data.deadline());
        roomRepository.save(room);

        return data;
    }
}
