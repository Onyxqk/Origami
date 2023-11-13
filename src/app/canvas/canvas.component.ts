import { Component, ElementRef, ViewChild } from '@angular/core'
import { BrushService } from '../services/brush.service'
import { ColorService } from '../services/color.service'
import { Subscription } from 'rxjs'
import { ExportImportService } from '../services/export-import.service'
import { ModeService } from '../services/mode.service'
import { ShapeService } from '../services/shape.service'
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

  constructor(private colorService: ColorService, private brushService: BrushService, public exportImportService: ExportImportService, private shapeService: ShapeService, private modeService: ModeService) {
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
  }

 ngOnDestroy() {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
    if (this.brushSubscription) {
      this.brushSubscription.unsubscribe();
    }
  }

  startDrawing(event: MouseEvent) {
    if(this.modeService.getMode() !== 'brush') {
      this.drawShape(event, this.modeService.getMode())
    }
    else{
      this.isDrawing = true
      this.ctx.beginPath()
      this.ctx.moveTo(event.clientX - this.canvas.nativeElement.getBoundingClientRect().left, event.clientY - this.canvas.nativeElement.getBoundingClientRect().top)
    }  
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
    document.getElementById("origamiMenu")?.classList.toggle("show")
  }

  drawShape(event: MouseEvent, shape: String) {
    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top
    if (shape==='triangle') {
      this.shapeService.drawTriangle(this.ctx, x, y, 30,40, 50, 60)
    }
    else if (shape==='rectangle') {
      this.shapeService.drawRectangle(this.ctx, x, y, 60)
    }
    else if (shape==='circle') {
      const radius = 30
      this.shapeService.drawCircle(this.ctx, x, y, radius)
    }
  }
}