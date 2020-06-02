import { TestBed } from '@angular/core/testing';

import { TechUserService } from './tech-user.service';

describe('TechUserService', () => {
  let service: TechUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
