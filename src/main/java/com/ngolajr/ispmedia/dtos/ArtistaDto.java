package com.ngolajr.ispmedia.dtos;

import com.ngolajr.ispmedia.entities.Album;
import com.ngolajr.ispmedia.entities.Genero;

import java.util.List;
import java.util.UUID;

public record ArtistaDto(String titulo,
                         String thumbnailUri,
                         String descricao,
                         Genero genero,
                         List<Album> albums) {
}
