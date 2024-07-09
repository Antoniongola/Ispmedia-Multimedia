import { Component,ElementRef, ViewChild} from '@angular/core';
import {Radio} from "../../entities/Radio";

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrl: './radios.component.css'
})
export class RadiosComponent {
  radioUri:string='';
  currentRadio: Radio | null = null;
  angola:Radio[]=[new Radio('Radio Viana','assets/radios/radio-viana.jpg', 'http://radios.vpn.sapo.pt/AO/radio16.mp3'),
    new Radio('Radio Luanda','assets/radios/radioluanda.jpg', 'http://radios.vpn.sapo.pt/AO/radio11.mp3'),
  new Radio('Radio Ngola Yetu','assets/radios/n_gola_yetu.jpg', 'http://radios.vpn.sapo.pt/AO/radio12.mp3'),
  new Radio('Radio Cacuaco', 'assets/radios/radio-cacuaco.jpg', 'http://radios.vpn.sapo.pt/AO/radio17.mp3'),
  new Radio('Radio Unia', 'assets/radios/radio_unia.png', 'http://radios.vpn.sapo.pt/AO/radio2.mp3'),
  new Radio('Radio Mais', 'assets/radios/radio_mais.jpg', 'http://radios.vpn.sapo.pt/AO/radio10.mp3'),
  new Radio('Radio Escola', 'assets/radios/radio_escola.jpg', 'http://radios.vpn.sapo.pt/AO/radio1.mp3'),
  new Radio('Radio Ecclésia', 'assets/radios/radio_ecclesia.jpg','http://radios.vpn.sapo.pt/AO/radio8.mp3'),
  new Radio('Radio Cazenga', 'assets/radios/radio_cazenga.jpg', 'http://radios.vpn.sapo.pt/AO/radio13.mp3'),
  new Radio('Radio 5', 'assets/radios/radio_5.jpg', 'http://radios.vpn.sapo.pt/AO/radio5.mp3'),
  new Radio('Radio Despertar', 'assets/radios/logo_despertarangola.jpg', 'http://radios.vpn.sapo.pt/AO/radio15.mp3'),
  new Radio('Radio Lac', 'assets/radios/lac.jpg','http://radios.vpn.sapo.pt/AO/radio14.mp3'),
  new Radio('Radio Kairós', 'assets/radios/kairos.jpg', 'http://radios.vpn.sapo.pt/AO/radio9.mp3')];

  portugal:Radio[]=[];

  //Brasil

  Brasil:Radio[]=[new Radio('Jovem Pan','assets/radios/radio-viana.jpg', 'http://api.jovempanfm.uol.com.br:80/JPMP3'),
    new Radio('Radio Globo','assets/radios/radio-viana.jpg', 'http://stream.radio.com:8000/radioglobo'),
    new Radio('Band FM','assets/radios/radio-viana.jpg', 'http://stream.bandfm.com.br:8000/live')];
  //França
  Franca:Radio[]=[new Radio('NRJ','assets/radios/radio-viana.jpg', 'http://185.52.127.132/fr/30001/mp3_128.mp3?origine=fluxradios'),
    new Radio('France Inter','assets/radios/radio-viana.jpg', 'http://direct.franceinter.fr/live/franceinter-midfi.mp3'),
    new Radio('RTL','assets/radios/radio-viana.jpg', 'http://streaming.radio.rtl.fr/rtl-1-44-128')];
  //Alemanha
  Alemanha:Radio[]=[new Radio('Antenne Bayern','assets/radios/radio-viana.jpg', 'http://mp3channels.webradio.antenne.de/antenne'),
    new Radio('Deutschlandfunk','assets/radios/radio-viana.jpg', 'http://st01.dlf.de/dlf/01/128/mp3/stream.mp3'),
    new Radio('Radioeins','assets/radios/radio-viana.jpg', 'http://rbb-radioeins-live.cast.addradio.de/rbb/radioeins/live/mp3/128/stream.mp3')];
//Canada
  Canana:Radio[]=[new Radio('CBC Radio One','assets/radios/radio-viana.jpg', 'http://cbcmp3.ic.llnwd.net/stream/cbcmp3_cbc_r1_tor'),
    new Radio('Virgin Radio','assets/radios/radio-viana.jpg', 'http://virginradio.ic.llnwd.net/stream/virginradio_tor.mp3'),
    new Radio('Q107','assets/radios/radio-viana.jpg', 'http://player.streamtheworld.com/api/livestream-redirect/Q107.mp3')];
//Australia
  Australia:Radio[]=[new Radio('Los 40','assets/radios/radio-viana.jpg', 'http://playerservices.streamtheworld.com/api/livestream-redirect/LOS40.mp3'),
    new Radio('Cadena SER','assets/radios/radio-viana.jpg', 'http://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER.mp3'),
    new Radio('2Day FM','assets/radios/radio-viana.jpg', 'http://playerservices.streamtheworld.com/api/livestream-redirect/2DAYFMAAC.aac')];
//Spain
  Spain:Radio[]=[new Radio('Triple J','assets/radios/radio-viana.jpg', 'http://live-radio01.mediahubaustralia.com/2TJW/mp3/'),
    new Radio('Nova 96.9','assets/radios/radio-viana.jpg', 'http://streaming.novaentertainment.com.au/nova969'),
    new Radio('Radio Nacional','assets/radios/radio-viana.jpg', 'http://rne.rtveradio.cires21.com/rneradio.mp3')];
// Italy
  Italy:Radio[]=[new Radio('RAI Radio 1','assets/radios/radio-viana.jpg', 'http://icestreaming.rai.it/1.mp3'),
    new Radio('Radio Deejay','assets/radios/radio-viana.jpg', 'http://playerservices.streamtheworld.com/api/livestream-redirect/RADIODEEJAYAAC.aac'),
    new Radio('Radio Italia','assets/radios/radio-viana.jpg', 'http://radioitalialive.fluidstream.it/RadioItaliaLive.mp3')];


  USA:Radio[]=[new Radio('WSGL', 'assets/radios/WSGL.png', 'https://www.radio.net/s/wepnfm'),
    new Radio('WHTZ', 'assets/radios/WSGL.png', 'http://playerservices.streamtheworld.com/api/livestream-redirect/WHTZFM.mp3'),
    new Radio('Power 106', 'assets/radios/WSGL.png', 'http://playerservices.streamtheworld.com/api/livestream-redirect/KPWRFM.mp3'),
    new Radio('KEXP', 'assets/radios/WSGL.png', 'https://live-mp3-128.kexp.org/kexp128.mp3')
  ];
  isPlaying: boolean = false;
  duration: number = 0;
  currentTime: number = 0;
  progress: number = 0;
  isMuted: boolean = false;
  volume= 1
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  play(radio: Radio) {
    this.radioUri = radio.uri;
    this.isPlaying = true;
    setTimeout(() => {
      this.audioElement.nativeElement.play();
    }, 0);
  }

  togglePlayPause() {
    const audio = this.audioElement.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  setVolume(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.volume = parseFloat(inputElement.value);
    this.audioElement.nativeElement.volume = this.volume;
  }

  onMetadataLoaded() {
    this.duration = this.audioElement.nativeElement.duration;
  }

  onTimeUpdate() {
    this.currentTime = this.audioElement.nativeElement.currentTime;
    this.progress = (this.currentTime / this.duration) * 100;
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioElement.nativeElement.muted = this.isMuted;
  }

  seek(event: MouseEvent) {
    const progressContainer = event.currentTarget as HTMLElement;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    this.audioElement.nativeElement.currentTime = percentage * this.duration;
  }

  formatTime(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
