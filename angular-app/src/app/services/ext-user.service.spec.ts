import { TestBed } from '@angular/core/testing';

import { ExtUserService } from './ext-user.service';

describe('ExtUserService', () => {
  let service: ExtUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
