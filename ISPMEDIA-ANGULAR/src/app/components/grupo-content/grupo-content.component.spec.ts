import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoContentComponent } from './grupo-content.component';

describe('GrupoContentComponent', () => {
  let component: GrupoContentComponent;
  let fixture: ComponentFixture<GrupoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
