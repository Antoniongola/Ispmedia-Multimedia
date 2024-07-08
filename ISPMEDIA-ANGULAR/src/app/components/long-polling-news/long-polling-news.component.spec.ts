import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongPollingNewsComponent } from './long-polling-news.component';

describe('LongPollingNewsComponent', () => {
  let component: LongPollingNewsComponent;
  let fixture: ComponentFixture<LongPollingNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongPollingNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LongPollingNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
