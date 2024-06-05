package com.ngolajr.ispmedia.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class UploadManager {
    public static void saveFile(MultipartFile file) throws IOException {
        Path uploadPath = Path.of("C:\\Users\\Ngola\\IdeaProjects\\ISPMEDIA\\src\\main\\resources\\static\\");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }
}
