import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCreationComponent } from './album-creation.component';

describe('AlbumCreationComponent', () => {
  let component: AlbumCreationComponent;
  let fixture: ComponentFixture<AlbumCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
