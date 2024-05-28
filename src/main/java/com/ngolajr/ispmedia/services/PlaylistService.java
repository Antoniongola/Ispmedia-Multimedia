package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.entities.Playlist;
import com.ngolajr.ispmedia.repositories.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository repository;
    public Playlist newPlaylist(Playlist playlist) {
        boolean existente = false;
        List<Playlist> playlists = repository.findAll();

        for (Playlist list : playlists)
            if (playlist.getTitulo().equalsIgnoreCase(list.getTitulo()))
                existente = true;

        if(existente)
            return null;

        //System.out.println(playlist.toString());

        repository.save(playlist);

        return playlist;
    }

    public List<Playlist> allPlaylist(){
        return this.repository.findAll();
    }
}
