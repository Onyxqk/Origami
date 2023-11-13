import { Injectable } from '@angular/core'
import { ColorService } from '../services/color.service'

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private colorService: ColorService) {}

  drawTriangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.closePath()
    this.colorService.getColor().subscribe((color) => {ctx.strokeStyle=color
    })
    ctx.stroke()
  }

  drawRectangle(ctx: CanvasRenderingContext2D, x: number, y: number, sideLength: number) {
    ctx.beginPath();
    ctx.rect(x, y, sideLength, sideLength)
    this.colorService.getColor().subscribe((color) => {ctx.strokeStyle=color
    })
    ctx.closePath();
    ctx.stroke();
  }

  drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.closePath()
    this.colorService.getColor().subscribe((color) => {ctx.strokeStyle=color
    })
    ctx.stroke()
  }
}
