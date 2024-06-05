package com.ngolajr.ispmedia.dtos;

import com.ngolajr.ispmedia.entities.Artista;
import com.ngolajr.ispmedia.entities.Genero;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public record MusicUploadDto(String tituloMusica,
                             UUID autor,
                             Genero genero,
                             MultipartFile musicFile,
                             MultipartFile albumImage,
                             MultipartFile artistImage) {
}
