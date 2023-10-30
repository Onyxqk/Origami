import { Component, ElementRef, ViewChild } from '@angular/core'
import { BrushService } from '../services/brush.service'
import { ColorService } from '../services/color.service'
import { Subscription } from 'rxjs'
import { ExportImportService } from '../services/export-import.service'

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
  input = document.createElement('input')

  constructor(private colorService: ColorService, private brushService: BrushService, public exportImportService: ExportImportService) {
    this.colorSubscription = this.colorService.getColor().subscribe((color) => {
      this.ctx.strokeStyle = color
      this.ctx.fillStyle = color
    })
    this.brushSubscription = this.brushService.getLineWidth().subscribe((lineWidth) => {
      switch (lineWidth) {
        case 1:
          this.ctx.lineWidth = 1
          break
        case 2:
          this.ctx.lineWidth = 5
          break
        case 3:
          this.ctx.lineWidth = 10
          break
      }
    })
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true
    this.ctx.beginPath()
    this.ctx.moveTo(event.clientX - this.canvas.nativeElement.getBoundingClientRect().left, event.clientY - this.canvas.nativeElement.getBoundingClientRect().top)
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return

    this.ctx.lineTo(event.clientX - this.canvas.nativeElement.getBoundingClientRect().left, event.clientY - this.canvas.nativeElement.getBoundingClientRect().top)
    this.ctx.stroke()
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
    document.getElementById("origamiMenu").classList.toggle("show")
  }
}