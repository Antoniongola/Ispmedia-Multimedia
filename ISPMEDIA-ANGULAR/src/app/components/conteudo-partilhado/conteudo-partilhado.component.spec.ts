import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoPartilhadoComponent } from './conteudo-partilhado.component';

describe('ConteudoPartilhadoComponent', () => {
  let component: ConteudoPartilhadoComponent;
  let fixture: ComponentFixture<ConteudoPartilhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConteudoPartilhadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConteudoPartilhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
