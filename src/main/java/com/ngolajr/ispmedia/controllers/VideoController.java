package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.repositories.VideoRepository;
import com.ngolajr.ispmedia.services.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/video", produces = "application/json")
@RequiredArgsConstructor
public class VideoController {
    private final VideoService service;

    @PostMapping
    public ResponseEntity<Object> uploadVideo(@RequestPart Video video, @RequestPart MultipartFile videoFile) throws Exception {
        return ResponseEntity.ok(this.service.createVideo(video, videoFile, 0L));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Video> selectVideoInfos(@PathVariable UUID id){
        return this.service.selectVideoInfos(id);
    }

    @GetMapping
    public ResponseEntity<List<Video>> allVideos(){
        return this.service.allVideos();
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<Resource> videoImage(@PathVariable UUID id) throws FileNotFoundException {
        return this.service.videoThumbnail(id);
    }

    @GetMapping("/play/{id}")
    public ResponseEntity<byte[]> playVideo(@PathVariable String id, @RequestHeader(value = "Range", required = false) String range) {
        return this.service.playVideo(UUID.fromString(id), range);
    }

    
    @GetMapping("/{id}/video")
    public ResponseEntity<Resource> albumVideo(@PathVariable UUID id,
                                               @RequestHeader HttpHeaders headers) throws IOException {
        return this.service.getVideoChunk(id, headers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response> apagarVideo(@PathVariable UUID id){
        return this.service.apagarVideo(id);
    }
}
