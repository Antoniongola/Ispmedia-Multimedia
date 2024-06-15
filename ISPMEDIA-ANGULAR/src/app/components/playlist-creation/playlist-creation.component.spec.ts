import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreationComponent } from './playlist-creation.component';

describe('PlaylistCreationComponent', () => {
  let component: PlaylistCreationComponent;
  let fixture: ComponentFixture<PlaylistCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
