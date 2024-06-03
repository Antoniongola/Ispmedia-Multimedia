package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileManager {
    @Value("${upload.musica}")
    static String musicas;
    @Value("${upload.imagem}")
    static String imagens;
    @Value("${upload.video}")
    static String videos;
    public static void saveFile(MultipartFile file, TipoFicheiro tipoFicheiro) throws IOException {
        Path uploadPath = Path.of(imagens);

        if(tipoFicheiro == TipoFicheiro.MUSICA)
            uploadPath = Path.of(musicas);
        else if(tipoFicheiro == TipoFicheiro.IMAGEM)
            uploadPath = Path.of(imagens);
        else if(tipoFicheiro == tipoFicheiro.VIDEO)
            uploadPath = Path.of(videos);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }


}
