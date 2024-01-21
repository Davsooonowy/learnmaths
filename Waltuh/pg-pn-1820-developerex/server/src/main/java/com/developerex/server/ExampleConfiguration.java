package com.developerex.server;

import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.attendee.AttendeeRepository;
import com.developerex.server.room.model.Room;
import com.developerex.server.room.RoomRepository;
import com.developerex.server.term.model.Term;
import com.developerex.server.term.TermRepository;
import com.developerex.server.vote.model.Vote;
import com.developerex.server.vote.VoteRepository;
import com.developerex.server.vote.model.VoteType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Configuration
public class ExampleConfiguration {
    @Bean
    CommandLineRunner commandLineRunner(RoomRepository roomRepository, AttendeeRepository attendeeRepository,
                                        TermRepository termRepository, VoteRepository voteRepository) {
        return args -> {
            if (roomRepository.count() == 0) {

                var attendee1 = Attendee.builder()
                        .username("username1")
                        .email("username1@example.com")
                        .password("password1")
                        .participationRooms(new HashSet<>())
                        .ownedRooms(new ArrayList<>())
                        .created(Instant.now())
                        .enabled(true)
                        .build();

                var attendee2 = Attendee.builder()
                        .username("Example name 2")
                        .email("example2@example.com")
                        .password("examplepassword2")
                        .participationRooms(new HashSet<>())
                        .ownedRooms(new ArrayList<>())
                        .created(Instant.now())
                        .enabled(true)
                        .build();

                var attendee3 = Attendee.builder()
                        .username("Example name 3")
                        .email("example3@example.com")
                        .password("examplepassword3")
                        .participationRooms(new HashSet<>())
                        .ownedRooms(new ArrayList<>())
                        .created(Instant.now())
                        .enabled(true)
                        .build();

                attendeeRepository.saveAll(List.of(attendee1, attendee2, attendee3));

                var room = Room.builder()
                        .title("Example title 1")
                        .description("Example description 1")
                        .deadline(LocalDate.now().atStartOfDay().plusDays(20))
                        .terms(new ArrayList<>())
                        .participants(new HashSet<>())
                        .owner(attendee2)
                        .build();

                roomRepository.save(room);

                attendee2.addOwnedRoom(room);

                attendeeRepository.save(attendee2);


                attendee1.addParticipationRoom(room);
                room.addParticipant(attendee1);
//
                attendeeRepository.save(attendee1);
                roomRepository.save(room);

                var term1 = Term.builder()
                        .startDateTime(LocalDate.now().atStartOfDay())
                        .duration(60)
                        .votes(new ArrayList<>())
                        .room(room)
                        .build();

                var term2 = Term.builder()
                        .startDateTime(LocalDateTime.now().plusHours(1))
                        .duration(60)
                        .votes(new ArrayList<>())
                        .room(room)
                        .build();

                termRepository.saveAll(List.of(term1, term2));

                var vote = Vote.builder()
                        .voteType(VoteType.AVAILABLE)
                        .build();

                voteRepository.save(vote);

                attendee1.setVotes(List.of(vote));
                attendeeRepository.save(attendee1);

                term1.addVote(vote);

                termRepository.saveAll(List.of(term1, term2));
                vote.setTerm(term1);
                vote.setAttendee(attendee1);

                room.addTerm(term1);
                room.addTerm(term2);

                voteRepository.save(vote);

//                roomRepository.save(room);
            }
        };
    }
}
