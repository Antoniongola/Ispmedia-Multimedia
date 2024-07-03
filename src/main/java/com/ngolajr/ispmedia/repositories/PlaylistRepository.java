package com.ngolajr.ispmedia.repositories;

import com.ngolajr.ispmedia.entities.Playlist;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.Privacidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    public List<Playlist> findAllByPrivacidadeEqualsOrOwnerEquals(Privacidade privacidade, Utilizador owner);
    public List<Playlist> findAllByOwner(Utilizador owner);
}
