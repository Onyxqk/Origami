import { Injectable } from '@angular/core'
import { ColorService } from './color.service'
@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private colorService: ColorService) {}

  drawText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, fontSize: string = '16px Arial') {
    this.colorService.getColor().subscribe((color) => {ctx.fillStyle=color
    })
    ctx.font = fontSize
    ctx.fillText(text, x, y)
  }
}
