package com.ngolajr.ispmedia.entities;

import com.ngolajr.ispmedia.entities.enums.TipoFicheiro;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class FileManager {
    @Value("${upload.musica}")
    String musicas;
    @Value("${upload.imagem}")
    String imagens;
    @Value("${upload.video}")
    String videos;
    public void saveFile(MultipartFile file, TipoFicheiro tipoFicheiro) throws IOException {
        Path uploadPath = Path.of(imagens);

        if(tipoFicheiro == TipoFicheiro.MUSICA)
            uploadPath = Path.of(musicas);
        else if(tipoFicheiro == TipoFicheiro.IMAGEM) {
            uploadPath = Path.of(imagens);
        }
        else if(tipoFicheiro == TipoFicheiro.VIDEO)
            uploadPath = Path.of(videos);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(file.getOriginalFilename());
        file.transferTo(filePath.toFile());
    }


}
