package com.ngolajr.ispmedia.controllers;

import com.ngolajr.ispmedia.dtos.MusicUploadDto;
import com.ngolajr.ispmedia.dtos.MusicaDto;
import com.ngolajr.ispmedia.dtos.Response;
import com.ngolajr.ispmedia.entities.Musica;
import com.ngolajr.ispmedia.entities.Video;
import com.ngolajr.ispmedia.services.MusicaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping(path = "/api/upload")
@RequiredArgsConstructor
public class UploadContentController {
    private final MusicaService musicaService;

    @PostMapping
    public ResponseEntity<Response> uploadFiles(@RequestPart MusicUploadDto formData) {

        try {
            saveFile(formData.musicFile());
            saveFile(formData.albumImage());
            saveFile(formData.artistImage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("ERRO DE UPLOAD"));
        }
        return ResponseEntity.ok(new Response("UPLOAD FEITO COM SUCESSO"));
    }

    /*
    esse tá fzer upload, resta ver o de cima se vai fazer o que quero
    @PostMapping
    public ResponseEntity<Response> uploadFiles(@RequestParam String teste, @RequestPart("file") MultipartFile[] files) {
        for(MultipartFile file : files) {
            try {
                saveFile(file);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Response("ERRO DE UPLOAD"));
            }
        }
        return ResponseEntity.ok(new Response("UPLOAD FEITO COM SUCESSO"));
    }
    */
    private void saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Path.of("C:\\Users\\Ngola\\IdeaProjects\\ISPMEDIA\\src\\main\\resources\\static\\");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }
}
