import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LineSmoothingService {

  smoothLine(points: { x: number; y: number }[], windowSize: number): { x: number; y: number }[] {
    const smoothedPoints: { x: number; y: number }[] = []

    for (let i = 0; i < points.length; i++) {
      if (i < windowSize) {
        smoothedPoints.push(points[i])
      } else {
        let xSum = 0
        let ySum = 0
        for (let j = i - windowSize; j < i; j++) {
          xSum += points[j].x
          ySum += points[j].y
        }

        const xAvg = xSum / windowSize
        const yAvg = ySum / windowSize
        smoothedPoints.push({ x: xAvg, y: yAvg })
      }
    }

    return smoothedPoints
  }

}
