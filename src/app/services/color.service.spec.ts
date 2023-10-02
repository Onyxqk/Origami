import { TestBed } from '@angular/core/testing';

import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get color', () => {
    const color = 'red';
    service.setColor(color);
    service.getColor().subscribe((result) => {
      expect(result).toBe(color);
    });
  });
});
