import { TestBed } from '@angular/core/testing'

import { LineSmoothingService } from './line-smoothing.service'

describe('LineSmoothingService', () => {
  let service: LineSmoothingService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LineSmoothingService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('smoothLine', () => {
    it('should return the same points if the number of points is less than the window size', () => {
      const points = [{ x: 1, y: 2 }, { x: 3, y: 4 }]
      const windowSize = 3
      const result = service.smoothLine(points, windowSize)
      expect(result).toEqual(points)
    })

    it('should return smoothed points if the number of points is greater than or equal to the window size', () => {
      const points = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }, { x: 7, y: 8 }]
      const windowSize = 3
      const result = service.smoothLine(points, windowSize)

      const expectedSmoothedPoints = [
        { x: 1, y: 2 },
        { x: (1 + 3 + 5) / 3, y: (2 + 4 + 6) / 3 },
        { x: (3 + 5 + 7) / 3, y: (4 + 6 + 8) / 3 },
        { x: 3, y: 4 },
      ]

      expect(result).toEqual(expectedSmoothedPoints)
    })

    it('should return an empty array if the input points array is empty', () => {
      const points: { x: number; y: number }[] = []
      const windowSize = 3
      const result = service.smoothLine(points, windowSize)
      expect(result).toEqual([])
    })
  })
})
