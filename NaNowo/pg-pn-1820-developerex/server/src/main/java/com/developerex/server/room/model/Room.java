package com.developerex.server.room.model;

import com.developerex.server.term.model.Term;
import com.developerex.server.attendee.model.Attendee;
import com.developerex.server.validation.FutureFetchTime;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Room {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        @Size(min = 1, max=50, message = "Title should be 1 - 50 characters long")
        @NotNull(message = "Title can not be null")
        @NotBlank(message = "Title can not be blank")
        private String title;

        @Size(max=150, message = "Description should be max 150 characters long")
        private String description;

        @FutureFetchTime(message = "Deadline must be in the future")
        private LocalDateTime deadline;

        @ManyToOne
        @JoinColumn(name="owner_id")
        @JsonManagedReference
        private Attendee owner;

        @OneToMany(mappedBy = "room")
        @JsonManagedReference
        private List<Term> terms;

        @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST})
        @JoinTable(
                name = "room_attendee",
                joinColumns = @JoinColumn(name = "room_id", referencedColumnName = "id"),
                inverseJoinColumns = @JoinColumn(name = "attendee_id", referencedColumnName = "id")
        )
        @JsonManagedReference
        private Set<Attendee> participants;

        public void addTerm(Term term) {
                this.terms.add(term);
        }

        public void addParticipant(Attendee attendee) {
                this.participants.add(attendee);
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                Room room = (Room) o;
                return Objects.equals(id, room.id);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id);
        }
}
