import { TestBed } from '@angular/core/testing';

import { LineSmoothingService } from './line-smoothing.service';

describe('LineSmoothingService', () => {
  let service: LineSmoothingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineSmoothingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
