import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsAlbumsComponent } from './artists-albums.component';

describe('ArtistsAlbumsComponent', () => {
  let component: ArtistsAlbumsComponent;
  let fixture: ComponentFixture<ArtistsAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsAlbumsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistsAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
