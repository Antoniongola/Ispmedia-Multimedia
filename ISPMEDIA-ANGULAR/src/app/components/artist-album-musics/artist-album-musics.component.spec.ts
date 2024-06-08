import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumMusicsComponent } from './artist-album-musics.component';

describe('ArtistAlbumMusicsComponent', () => {
  let component: ArtistAlbumMusicsComponent;
  let fixture: ComponentFixture<ArtistAlbumMusicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistAlbumMusicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistAlbumMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
