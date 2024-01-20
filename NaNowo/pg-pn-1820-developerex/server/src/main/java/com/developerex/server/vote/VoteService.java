package com.developerex.server.vote;

import com.developerex.server.attendee.AttendeeRepository;
import com.developerex.server.mail.MailService;
import com.developerex.server.room.RoomRepository;
import com.developerex.server.room.model.Room;
import com.developerex.server.term.TermRepository;
import com.developerex.server.vote.dto.NewVoteDto;
import com.developerex.server.vote.dto.VoteDto;
import com.developerex.server.vote.mapper.VoteMapper;
import com.developerex.server.vote.model.Vote;
import com.developerex.server.vote.model.VoteType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final RoomRepository roomRepository;
    private final TermRepository termRepository;
    private final AttendeeRepository attendeeRepository;
    private final MailService mailService;

    public List<VoteDto> getAllVotes() {
        return voteRepository.findAll()
                .stream()
                .map(VoteMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public boolean addVote(NewVoteDto voteDto) {
        LocalDateTime roomDeadline = roomRepository.findById(termRepository.findById(voteDto.getTermId()).orElseThrow().getRoom().getId()).orElseThrow(() -> new EntityNotFoundException("No room found")).getDeadline();

        if (roomDeadline.isBefore(LocalDateTime.now())) {
            return false;
        }

        if (voteRepository.findByAttendeeIdAndTermId(voteDto.getAttendeeId(), voteDto.getTermId()).isPresent()) {
            Vote vote = (Vote) voteRepository.findByAttendeeIdAndTermId(voteDto.getAttendeeId(), voteDto.getTermId()).orElseThrow(() -> new EntityNotFoundException("No vote found with attendee id: " + voteDto.getAttendeeId() + " and term id: " + voteDto.getTermId()));
            vote.setVoteType(getVoteType(voteDto.getVoteType()));
            voteRepository.save(vote);
            return true;
        }

        Vote vote = Vote.builder().voteType(getVoteType(voteDto.getVoteType()))
                .attendee(attendeeRepository.findById(voteDto.getAttendeeId()).orElseThrow(() -> new EntityNotFoundException("No attendee found with id: " + voteDto.getAttendeeId())))
                .term(termRepository.findById(voteDto.getTermId()).orElseThrow(() -> new EntityNotFoundException("No term found with id: " + voteDto.getTermId()))).build();


        voteRepository.save(vote);

        return true;
    }

    private static VoteType getVoteType(String voteType){
        switch (voteType){
            case "AVAILABLE":
                return VoteType.AVAILABLE;
            case "NOT_AVAILABLE":
                return VoteType.NOT_AVAILABLE;
            case "MAYBE":
                return VoteType.MAYBE;
            case "PENDING":
                return VoteType.PENDING;
            default:
                return null;
        }
    }

    public boolean stopVoting(Long roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new EntityNotFoundException("No room found with id: " + roomId));
        room.setDeadline(LocalDateTime.now());


        room.getParticipants().forEach(attendee -> {
            mailService.send(attendee.getEmail(), "Voting has ended", "Voting has ended for room: " + room.getTitle() + "check the results here " + "http://localhost:3000/room/" + roomId);
        });


        roomRepository.save(room);
        return true;
    }
}
