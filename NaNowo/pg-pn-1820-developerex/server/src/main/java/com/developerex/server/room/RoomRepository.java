package com.developerex.server.room;

import com.developerex.server.room.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<List<Room>> findAllByOwnerId(Long userId);

    Optional<List<Room>> findAllByParticipantsId(Long userId);

}
