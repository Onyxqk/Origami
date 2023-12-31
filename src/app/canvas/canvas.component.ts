import { Component, ElementRef, ViewChild } from '@angular/core'
import { BrushService } from '../services/brush.service'
import { ColorService } from '../services/color.service'
import { Subscription } from 'rxjs'
import { ExportImportService } from '../services/export-import.service'
import { ModeService } from '../services/mode.service'
import { ShapeService } from '../services/shape.service'
import { TextService } from '../services/text.service'
import { UndoRedoService } from '../services/undo-redo.service'
import { LineSmoothingService } from '../services/line-smoothing.service'
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  providers: [ExportImportService],
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent {
  @ViewChild('canvasElement', { static: true }) canvas!: ElementRef<HTMLCanvasElement>
  ctx: CanvasRenderingContext2D
  isDrawing = false
  isResizing = false
  initialWidth: number
  initialHeight: number
  initialX: number
  initialY: number
  colorSubscription: Subscription
  brushSubscription: Subscription
  thinLineWidth = 1
  mediumLineWidth = 5
  thickLineWidth = 10
  input = document.createElement('input')
  currentPoints: { x: number; y: number }[] = []

  constructor(private colorService: ColorService, private brushService: BrushService,
    public exportImportService: ExportImportService, public shapeService: ShapeService,
    private modeService: ModeService, public textService: TextService, private undoRedoService: UndoRedoService, private lineSmoothingService: LineSmoothingService) {

    this.colorSubscription = this.colorService.getColor().subscribe((color) => {
      this.ctx.strokeStyle = color
    })
    this.brushSubscription = this.brushService.getLineWidth().subscribe((lineWidth) => {
      switch (lineWidth) {
        case 1:
          this.ctx.lineWidth = this.thinLineWidth
          break
        case 2:
          this.ctx.lineWidth = this.mediumLineWidth
          break
        case 3:
          this.ctx.lineWidth = this.thickLineWidth
          break
      }
    })
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.saveCanvasState()
  }

  ngOnDestroy() {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe()
    }
    if (this.brushSubscription) {
      this.brushSubscription.unsubscribe()
    }
  }

  drawSmoothedLine(points: { x: number; y: number }[]) {
    const windowSize = 3
    const smoothedPoints = this.lineSmoothingService.smoothLine(points, windowSize)

    this.ctx.beginPath()
    this.ctx.moveTo(smoothedPoints[0].x, smoothedPoints[0].y)
    for (let i = 1; i < smoothedPoints.length; i++) {
      this.ctx.lineTo(smoothedPoints[i].x, smoothedPoints[i].y)
    }
    this.ctx.stroke()
    this.ctx.closePath()
  }

  startDrawing(event: MouseEvent) {
    if (this.modeService.getMode() !== 'brush' && this.modeService.getMode() !== 'text' && this.modeService.getMode() !== 'erase') {
      this.drawShape(event, this.modeService.getMode())
    }
    if (this.modeService.getMode() === 'text') {
      this.addText(event)
    }
    if (this.modeService.getMode() === 'erase') {
      this.erase(event)
    }
    else {
      this.isDrawing = true
      this.currentPoints = []
      this.currentPoints.push({
        x: event.clientX - this.canvas.nativeElement.getBoundingClientRect().left,
        y: event.clientY - this.canvas.nativeElement.getBoundingClientRect().top,
      })
    }
    this.saveCanvasState()
  }

  erase(event: MouseEvent) {
    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top

    this.ctx.clearRect(x, y, x + this.ctx.lineWidth, y + this.ctx.lineWidth)
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;

    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top

    this.currentPoints.push({ x, y })

    this.drawSmoothedLine(this.currentPoints)

    this.currentPoints = [{ x, y }]
  }

  stopDrawing() {
    this.isDrawing = false
    this.ctx.closePath()
  }

  startResize(event: MouseEvent) {
    this.isResizing = true
    this.initialWidth = this.canvas.nativeElement.offsetWidth
    this.initialHeight = this.canvas.nativeElement.offsetHeight
    this.initialX = event.clientX
    this.initialY = event.clientY
  }

  resize(event: MouseEvent) {
    if (!this.isResizing) return

    const deltaX = event.clientX - this.initialX
    const deltaY = event.clientY - this.initialY

    this.canvas.nativeElement.style.width = this.initialWidth + deltaX + 'px'
    this.canvas.nativeElement.style.height = this.initialHeight + deltaY + 'px'
  }

  stopResize() {
    this.isResizing = false
  }

  showMenu() {
    document.getElementById("origamiMenu")?.classList.toggle("show")
  }

  drawShape(event: MouseEvent, shape: String) {
    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    if (shape === 'triangle') {
      this.shapeService.drawTriangle(this.ctx, x, y, 30, 40, 50, 60)
    }
    else if (shape === 'rectangle') {
      this.shapeService.drawRectangle(this.ctx, x, y, 60)
    }
    else if (shape === 'circle') {
      const radius = 30
      this.shapeService.drawCircle(this.ctx, x, y, radius)
    }
  }

  addText(event: MouseEvent) {
    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    const text = prompt('Enter text: ')
    if (text) {
      this.textService.drawText(this.ctx, x, y, text)
    }
  }

  saveCanvasState() {
    this.undoRedoService.saveState(this.ctx.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height))
  }

  undo() {
    const state = this.undoRedoService.undo()
    if (state) {
      this.restoreCanvasState(state)
    }
  }

  redo() {
    const state = this.undoRedoService.redo()
    if (state) {
      this.restoreCanvasState(state)
    }
  }

  restoreCanvasState(state: ImageData) {
    this.ctx.putImageData(state, 0, 0)
  }

}