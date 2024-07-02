package com.ngolajr.ispmedia.dtos;

import com.ngolajr.ispmedia.entities.enums.TipoParticipante;

public record ParticipanteDto(TipoParticipante tipo, String promotor) {
}
