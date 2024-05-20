package com.ngolajr.ispmedia.dtos;

import com.ngolajr.ispmedia.entities.Album;

import java.util.List;
import java.util.UUID;

public record ArtistaDto(String titulo,
                         String thumbnailUri,
                         String descricao,
                         List<Album> albums) {
}
