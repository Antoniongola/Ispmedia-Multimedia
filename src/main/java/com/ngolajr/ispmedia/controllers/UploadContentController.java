package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping(path = "/api/upload", produces = "application/json")
@RequiredArgsConstructor
public class UploadContentController {
    private final MusicaService musicaService;
    private final String imagePath = "src/main/resources/static/imagens";
    private final String videoPath="src/main/resources/static/videos";

    @PostMapping("/musica")
    public ResponseEntity<String> handleMusicUpload(@RequestPart("data") Musica data,
                                                   @RequestPart("file") MultipartFile file) {
        // Process the JSON data
        String name = data.getTitulo();
        int age = 10;

        // Process the file
        String fileName = file.getOriginalFilename();
        try {
            String musicaPath = "src/main/resources/static/musicas";
            saveFile(musicaPath, fileName, file);
            MusicaDto dto = new MusicaDto(data.getTitulo(),
                    data.getDescricao(),
                    data.getThumbNailUri(),
                    data.getDuration(),
                    data.getPath());

            this.musicaService.createMusica(dto);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Received: " + name + ", " + age + ", File: " + fileName);
    }

    /*
    @PostMapping("/imagemAlbum")
    public ResponseEntity<String> handleImageUpload(@RequestPart("data") Musica data,
                                                    @RequestPart("file") MultipartFile file) {
        // Process the JSON data
        String name = data.getTitulo();
        int age = 10;

        // Process the file
        String fileName = file.getOriginalFilename();
        try {
            String musicaPath = "src/main/resources/static/musicas";
            saveFile(musicaPath, fileName, file);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Received: " + name + ", " + age + ", File: " + fileName);
    }*/

    @PostMapping("/video")
    public ResponseEntity<String> handleVideoUpload(@RequestPart("data") Video data,
                                                    @RequestPart("file") MultipartFile file) {
        // Process the JSON data
        String name = data.getTitulo();
        int age = 10;

        // Process the file
        String fileName = file.getOriginalFilename();
        try {
            String musicaPath = "src/main/resources/static/musicas";
            saveFile(musicaPath, fileName, file);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }

        return ResponseEntity.ok("Received: " + name + ", " + age + ", File: " + fileName);
    }

    private void saveFile(String uploadDir, String fileName, MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try {
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());
        } catch (IOException e) {
            throw new IOException("Could not save file: " + fileName, e);
        }
    }

}
