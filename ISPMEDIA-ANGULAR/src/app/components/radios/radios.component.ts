import { Component } from '@angular/core';
import {Radio} from "../../entities/Radio";

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrl: './radios.component.css'
})
export class RadiosComponent {
  radioUri:string='';
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
  steide:Radio[]=[new Radio('WSGL', 'assets/radios/WSGL.png', 'https://www.radio.net/s/wepnfm')];


  play(radio:Radio){
    this.radioUri=radio.uri;
  }
}
