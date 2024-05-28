package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.dtos.SignupResponse;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping(path = "/api/upload")
@RequiredArgsConstructor
public class UploadContentController {
    private final MusicaService musicaService;
    private final String imagePath = "src/main/resources/static/imagens";
    private final String videoPath="src/main/resources/static/videos";

    @PostMapping
    public ResponseEntity<SignupResponse> uploadFiles(@RequestParam String teste, @RequestPart("file") MultipartFile[] files) {
        for(MultipartFile file : files) {
            try {
                saveFile(file);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new SignupResponse("ERRO DE UPLOAD"));
            }
        }
        return ResponseEntity.ok(new SignupResponse("ERRO DE UPLOAD"));
    }

    /*@PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam String teste, @RequestPart("file") MultipartFile[] files) {
        try {
            if (files.length == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empty file(s) found.");
            }
            for (MultipartFile file : files) {
                System.out.println("salvou ficheiro: "+file.getName());
                saveFile(file);
            }
            return ResponseEntity.status(HttpStatus.OK).body("Files uploaded successfully.");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during upload.");
        }
    }*/

    private void saveFile(MultipartFile file) throws IOException {
        /*
        File staticDir = ResourceUtils.getFile("classpath:static/imagens");
        Path uploadPath = Paths.get(staticDir.getAbsolutePath());*/
        Path uploadPath = Path.of("C:\\Users\\Ngola\\IdeaProjects\\ISPMEDIA\\src\\main\\resources\\static\\imagens");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }

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
