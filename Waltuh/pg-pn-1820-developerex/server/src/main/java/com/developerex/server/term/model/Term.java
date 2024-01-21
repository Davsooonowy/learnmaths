package com.developerex.server.term.model;

import com.developerex.server.room.model.Room;
import com.developerex.server.validation.FutureFetchTime;
import com.developerex.server.vote.model.Vote;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @FutureFetchTime(message = "Term start date must be in the future")
    private LocalDateTime startDateTime;

    @PositiveOrZero(message = "Duration must be positive or zero")
    @NotNull(message = "Duration must not be null")

    private int duration;

    @OneToMany(mappedBy = "term")
    @JsonBackReference
    private List<Vote> votes;

    @ManyToOne
    @JoinColumn(name="room_id")
    @JsonBackReference
    private Room room;

    public void addVote(Vote vote){
        votes.add(vote);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Term term = (Term) o;
        return Objects.equals(id, term.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
