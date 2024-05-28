import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../../services/upload.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrl: './music-upload.component.css'
})
export class MusicUploadComponent{
  musicForm: FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.musicForm = this.fb.group({
      teste: [''],
      genre: [''],
      album: [''],
      albumImage: [null],
      artistImage: [null]
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.musicForm.patchValue({
        [controlName]: file
      });
    }
  }

  onSubmit() {
    if (this.musicForm.valid) {
      const formData = new FormData();
      formData.append('teste', this.musicForm.get('teste')?.value);
      formData.append('genre', this.musicForm.get('genre')?.value);
      formData.append('album', this.musicForm.get('album')?.value);
      formData.append('albumImage', this.musicForm.get('albumImage')?.value);
      formData.append('artistImage', this.musicForm.get('artistImage')?.value);

      this.http.post("http://localhost:8080/api/upload", formData).subscribe(
        response=>{
          console.log('response: '+response)
        }, error => {
          console.log('erro: '+error);
        }
      );

      // Envie o formData para o backend
      console.log('Form Submitted', formData);
    }
  }
}
