import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BrushService {

  private lineWidthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1)

  setLineWidth(lineWidth: number): void {
    this.lineWidthSubject.next(lineWidth)
  }

  getLineWidth(): Observable<number> {
    return this.lineWidthSubject.asObservable()
  }
}
