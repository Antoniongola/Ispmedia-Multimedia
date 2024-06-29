package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.entities.Playlist;
import com.ngolajr.ispmedia.services.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlist")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService service;

    @PostMapping()
    public ResponseEntity<Playlist> newPlaylist(@RequestBody Playlist playlist){
        if(this.service.newPlaylist(playlist) != null)
            return ResponseEntity.ok(this.service.newPlaylist(playlist));

        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> findById(@PathVariable long id){
        return this.service.findPlaylistByuId(id);
    }

    @GetMapping()
    public ResponseEntity<List<Playlist>> allPlaylist(){
        return ResponseEntity.ok(service.allPlaylist());
    }

    @GetMapping("/{username}/publicas")
    public ResponseEntity<List<Playlist>> allPlaylistsPublicas(@PathVariable String username){
        return ResponseEntity.ok(service.listasPublicas(username));
    }
}
