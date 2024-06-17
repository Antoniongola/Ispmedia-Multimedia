import { TestBed } from '@angular/core/testing';

import { GrupoConviteService } from './grupo-convite.service';

describe('GrupoConviteService', () => {
  let service: GrupoConviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoConviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
