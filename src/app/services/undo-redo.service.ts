import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {

  private undoStack: any[] = []
  private redoStack: any[] = []

  saveCanvasState(canvas: HTMLCanvasElement): ImageData {
    const ctx = canvas.getContext('2d')
    return ctx.getImageData(0, 0, canvas.width, canvas.height)
  }

  restoreCanvasState(canvas: HTMLCanvasElement, state: ImageData) {
    const ctx = canvas.getContext('2d')
    ctx.putImageData(state, 0, 0)
  }

  pushUndoAction(action: any) {
    this.undoStack.push(action)
  }

  popUndoAction(): any {
    return this.undoStack.pop()
  }

  pushRedoAction(action: any) {
    this.redoStack.push(action)
  }

  popRedoAction(): any {
    return this.redoStack.pop()
  }

  clearRedoStack() {
    this.redoStack = []
  }
}
