import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-music-upload',
  templateUrl: './music-upload.component.html',
  styleUrl: './music-upload.component.css'
})
export class MusicUploadComponent implements OnInit {
  // @ts-ignore
  uploadForm: FormGroup;
  artists = ['Artist 1', 'Artist 2', 'Artist 3']; // Replace with real artist data

  constructor(private fb: FormBuilder, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      musicName: ['', Validators.required],
      musicGenre: ['', Validators.required],
      artist: ['', Validators.required],
      musicFile: [null, Validators.required]
    });
  }

  // @ts-ignore
  onFileChange(event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      musicFile: file
    });
  }

  onSubmit() {
    if (this.uploadForm.invalid) {
      return;
    }

    const formValue = this.uploadForm.value;
    const musicData = {
      name: formValue.musicName,
      genre: formValue.musicGenre,
      artist: formValue.artist
    };

    this.uploadService.uploadMusic(musicData, formValue.musicFile).subscribe(
      response => {
        console.log('Upload successful', response);
      },
      error => {
        console.error('Upload failed', error);
      }
    );
  }
}
