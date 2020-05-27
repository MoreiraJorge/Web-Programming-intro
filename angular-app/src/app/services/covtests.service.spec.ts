import { TestBed } from '@angular/core/testing';

import { CovtestsService } from './covtests.service';

describe('CovtestsService', () => {
  let service: CovtestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovtestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
