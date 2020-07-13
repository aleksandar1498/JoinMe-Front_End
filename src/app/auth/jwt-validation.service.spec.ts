import { TestBed } from '@angular/core/testing';

import { JwtValidationService } from './jwt-validation.service';

describe('JwtValidationService', () => {
  let service: JwtValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
