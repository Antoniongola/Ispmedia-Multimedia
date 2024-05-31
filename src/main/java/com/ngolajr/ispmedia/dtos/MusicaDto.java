package com.ngolajr.ispmedia.dtos;

import org.springframework.web.multipart.MultipartFile;

public record MusicaDto(String titulo,
                        String descricao,
                        String thumbnailUri,
                        int duration,
                        String path,
                        MultipartFile file1,
                        MultipartFile file2) {
}
