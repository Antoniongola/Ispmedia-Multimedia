import {Component, OnInit} from '@angular/core';
import {Video} from "../../entities/Video";
import {VideoService} from "../../services/video/video.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Genero} from "../../entities/Genero";
import {Router} from "@angular/router";
import {LoginServiceService} from "../../services/login/login-service.service";
import {User} from "../../entities/User";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.css'
})
export class VideoUploadComponent implements OnInit{
  videoForm!:FormGroup;
  videos!:Video[];
  videoFile!:File;
  videoImage!:File;
  user:User = new User();
  username:any;
  constructor(private videoService:VideoService,
              private fb:FormBuilder,
              private router:Router,
              private loginService:LoginServiceService,
              private userService:UserService) {}

  onFileChange(event: any, fileNumber: number):void{
    if (fileNumber === 2) {
      this.videoFile = event.target.files[0];
    } else if (fileNumber === 1) {
      this.videoImage = event.target.files[0];
    }
  }

  ngOnInit():void{
    this.username = this.loginService.getUsername();
      this.userService.selecionarUser(this.username).subscribe(response=>{
        this.user = response;
        console.log("User carregado com sucesso!");
      });

    this.videoForm = this.fb.group({
      nome:['', Validators.required],
      descricao:['', Validators.required],
    })
  }

  onSubmit():void{
    const video:Video=new Video('', this.videoForm.get('nome')?.value, '', this.videoForm.get('descricao')?.value,
     new Genero(),'', this.user);

    this.videoService.uploadVideo(video, this.videoFile, this.videoImage).subscribe(response=>{
      alert('SUCESSO, VÍDEO BEM ENVIADO. UPLOAD FEITTO COM SUCESSO. '+response);
      this.router.navigate(['/']);
    }, error => {
      alert('ERRO NO ENVIO: '+error)
    });
  }
}
