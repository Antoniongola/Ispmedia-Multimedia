package com.ngolajr.ispmedia.services;

import com.ngolajr.ispmedia.dtos.ParticipanteDto;
import com.ngolajr.ispmedia.entities.Notificacao;
import com.ngolajr.ispmedia.entities.Participante;
import com.ngolajr.ispmedia.entities.Utilizador;
import com.ngolajr.ispmedia.entities.enums.EstadoEntrega;
import com.ngolajr.ispmedia.entities.enums.TipoNotificacao;
import com.ngolajr.ispmedia.entities.enums.TipoParticipante;
import com.ngolajr.ispmedia.repositories.NotificacaoRepository;
import com.ngolajr.ispmedia.repositories.ParticipanteRepository;
import com.ngolajr.ispmedia.repositories.UtilizadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipanteService {
    private final ParticipanteRepository participanteRepository;
    private final NotificacaoRepository notificacaoRepository;
    private final UtilizadorRepository userRepo;

    public ResponseEntity<List<Participante>> groupParticipante(long grupoId){
        return ResponseEntity.ok(participanteRepository.findAllByGrupo_Id(grupoId));
    }

    public ResponseEntity<Participante> makeParticipantRole(long participanteId, ParticipanteDto dto){
        if(this.participanteRepository.findById(participanteId).isPresent()){
            Notificacao news = new Notificacao();
            Participante participante = this.participanteRepository.findById(participanteId).get();
            Utilizador userPromotor = this.userRepo.findByUsername(dto.promotor()).get();


            news.setDestinatario(participante.getUser());
            news.setEmissor(userPromotor);
            if (dto.tipo()==TipoParticipante.EDITOR){
                participante.setTipo(TipoParticipante.EDITOR);
                news.setDescricao(userPromotor.getNome()+" tornou-lhe editor do grupo, já pode editar os conteúdos do grupo <"+participante.getGrupo().getNome()+">.");
                news.setTipoNotificacao(TipoNotificacao.EDITORGRUPO);
            } else if(dto.tipo()==TipoParticipante.OWNER){
                participante.setTipo(TipoParticipante.OWNER);
                news.setDescricao(userPromotor.getNome()+" tornou-lhe owner do grupo, já pode remover ou adicionar participantes no grupo <"+participante.getGrupo().getNome()+">.");
                news.setTipoNotificacao(TipoNotificacao.OWNERGRUPO);
            } else if (dto.tipo()==TipoParticipante.PARTICIPANTE){
                participante.setTipo(TipoParticipante.PARTICIPANTE);
                news.setDescricao(userPromotor.getNome()+" tornou-lhe participante do grupo, pode apenas assistir o conteudo do grupo <"+participante.getGrupo().getNome()+">.");
                news.setTipoNotificacao(TipoNotificacao.PARTICIPANTEGRUPO);
            }

            news.setEstadoEntregaNotificacao(EstadoEntrega.PENDENTE);
            notificacaoRepository.save(news);
            return ResponseEntity.ok(this.participanteRepository.save(participante));
        }
        return ResponseEntity.ok(null);
    }
}
