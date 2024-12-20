import { TestBed } from '@angular/core/testing';

import { NatureOfWorkService } from './nature-of-work.service';

describe('NatureOfWorkService', () => {
  let service: NatureOfWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureOfWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
