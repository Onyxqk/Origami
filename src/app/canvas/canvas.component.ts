import { Component, ElementRef, ViewChild } from '@angular/core'
import { ColorService } from '../services/color.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
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

  constructor(private colorService: ColorService) {
    this.colorSubscription = this.colorService.getColor().subscribe((color) => {
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = color;
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

  exportToPNG() {
    const canvas = this.canvas.nativeElement;
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'canvas-export.png'
    link.click()
  }
}