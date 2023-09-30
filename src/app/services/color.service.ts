import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('black')

  setColor(color: string): void {
    this.colorSubject.next(color)
  }

  getColor(): Observable<string> {
    return this.colorSubject.asObservable()
  }
}
