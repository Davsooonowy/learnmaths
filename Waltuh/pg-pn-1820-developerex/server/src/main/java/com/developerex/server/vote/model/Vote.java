package com.developerex.server.vote.model;

import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.term.model.Term;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Vote {
    private VoteType voteType;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="term_id")
    @JsonManagedReference
    @NotNull
    private Term term;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="attendee_id")
    @JsonManagedReference
    private Attendee attendee;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vote vote = (Vote) o;
        return Objects.equals(id, vote.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
