import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  private stateStack: ImageData[] = []
  private currentIndex: number = -1

  saveState(state: ImageData) {
    this.stateStack = this.stateStack.slice(0, this.currentIndex + 1)

    this.stateStack.push(state)
    this.currentIndex = this.stateStack.length - 1
  }

  undo(): ImageData | null {
    if (this.currentIndex > 0) {
      this.currentIndex--
      return this.getState()
    }
    return null
  }

  redo(): ImageData | null {
    if (this.currentIndex < this.stateStack.length - 1) {
      this.currentIndex++
      return this.getState()
    }
    return null
  }

  private getState(): ImageData {
    return this.stateStack[this.currentIndex]
  }
}
