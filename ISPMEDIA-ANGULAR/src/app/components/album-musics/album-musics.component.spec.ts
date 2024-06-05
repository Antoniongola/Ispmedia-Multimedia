import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumMusicsComponent } from './album-musics.component';

describe('AlbumMusicsComponent', () => {
  let component: AlbumMusicsComponent;
  let fixture: ComponentFixture<AlbumMusicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumMusicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
