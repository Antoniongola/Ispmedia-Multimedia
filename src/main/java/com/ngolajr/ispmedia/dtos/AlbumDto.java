package com.ngolajr.ispmedia.dtos;

import java.util.Date;

public record AlbumDto(String titulo,
                       String descricao,
                       Date dataLancamento,

                       String thumbnailUri) {

}
