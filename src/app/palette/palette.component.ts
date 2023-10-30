import { BrushService } from '../services/brush.service';
import { Component } from '@angular/core'
import { ColorService } from '../services/color.service'
@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent {
  selectedColor: string = 'black'
  lineWidth: number 
  constructor(private colorService: ColorService, public brushService: BrushService) {
    this.brushService.getLineWidth().subscribe((lineWidth) => {
      this.lineWidth = lineWidth;
    });
  }

  setColor(newColor: string): void {
    this.selectedColor = newColor
    this.colorService.setColor(newColor)
  }

  setLineWidth(){
    this.brushService.setLineWidth(this.lineWidth)
  }

}
