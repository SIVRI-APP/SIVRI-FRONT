import { TestBed } from '@angular/core/testing';

import { SemilleroObtenerService } from './semillero-obtener.service';

describe('SemilleroObtenerService', () => {
  let service: SemilleroObtenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemilleroObtenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
