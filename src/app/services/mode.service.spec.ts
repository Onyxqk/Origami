import { TestBed } from '@angular/core/testing';

import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ModeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should set mode to text', () => {
    const mode = 'text'
    service.setMode('text')
    expect(service.mode).toBe(mode)
  })

  it('should set mode to triangle', () => {
    const mode = 'rectangle'
    service.setMode('rectangle')
    expect(service.mode).toBe(mode)
  })

  it('should set mode to circle', () => {
    const mode = 'circle'
    service.setMode('circle')
    expect(service.mode).toBe(mode)
  })

  it('should set mode to rectangle', () => {
    const mode = 'rectangle'
    service.setMode('rectangle')
    expect(service.mode).toBe(mode)
  })
})
