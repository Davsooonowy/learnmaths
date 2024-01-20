package com.developerex.server.attendee.model;

import com.developerex.server.room.model.Room;
import com.developerex.server.vote.model.Vote;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min=1,max=50, message = "Username should 1 - 50 characters long")
    @NotBlank(message = "Username can not be blank")
    @NotNull(message = "Username can not be null")
    private String username;

    @Email(message = "Invalid mail")
    @Size(min =1, max=50, message = "Email should be 1 - 50 characters long")
    @NotBlank(message = "Email can not be blank")
    @NotNull(message = "Email can not be null")
    private String email;

    @Size(min = 6, max=50, message = "Password should be 6 - 50 characters long")
    @NotBlank(message = "Password can not be blank")
    @NotNull(message = "Password can not be null")
    private String password;

    @ManyToMany(mappedBy = "participants", fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST})
    @JsonBackReference
    private Set<Room> participationRooms;

    @OneToMany(mappedBy = "owner")
    @JsonBackReference
    private List<Room> ownedRooms;

    @OneToMany(mappedBy = "attendee")
    @JsonBackReference
    private List<Vote> votes;

    private Instant created;
    private boolean enabled;

    public void addParticipationRoom(Room room) {
        this.participationRooms.add(room);
    }

    public void addOwnedRoom(Room room) {
        this.ownedRooms.add(room);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Attendee attendee = (Attendee) o;
        return Objects.equals(id, attendee.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
