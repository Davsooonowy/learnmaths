package com.developerex.server.vote;


import com.developerex.server.vote.dto.NewVoteDto;
import com.developerex.server.vote.dto.VoteDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;

    @GetMapping
    public ResponseEntity<List<VoteDto>> getAllVotes() {
        List<VoteDto> votes = voteService.getAllVotes();
        return new ResponseEntity<>(votes, HttpStatus.OK);
    }

    @PostMapping("/add-vote")
    public ResponseEntity<NewVoteDto> addVote(@RequestBody NewVoteDto voteDto) {
        if (voteService.addVote(voteDto)){
            return ResponseEntity.ok(voteDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/stop-voting/{roomId}")
    public ResponseEntity<VoteDto> stopVoting(@PathVariable Long roomId) {
        if (voteService.stopVoting(roomId)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
