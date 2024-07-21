package com.ngolajr.ispmedia.entities;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
public class Video extends Conteudo{
    private String mimeType;
    private long duration;
    private String path;
    private int streams;
    private String formato;
    private String tamanho;
    private String type;
    public Video(){
        super();
        this.streams = 0;
    }
}
