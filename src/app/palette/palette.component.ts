import { Component } from '@angular/core';
import { ColorService } from '../services/color.service';
@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent {
  selectedColor: string = 'black'; // Default color

  constructor(private colorService: ColorService) {}

  setColor(newColor: string): void {
    this.selectedColor = newColor;
    this.colorService.setColor(newColor);
  }
}
