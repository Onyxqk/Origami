import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  mode = 'brush'
  constructor() { }

  setMode(mode: 'brush' | 'triangle' | 'circle' | 'rectangle' | 'text' | 'erase'): void {
    this.mode = mode
  }

  getMode(): string {
    return this.mode
  }
}
