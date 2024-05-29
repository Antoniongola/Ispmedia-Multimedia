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

    @GetMapping()
    public ResponseEntity<List<Playlist>> allPlaylist(){
        return ResponseEntity.ok(service.allPlaylist());
    }
}