import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent {
  @ViewChild('canvasElement', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private isResizing = false
  private initialWidth: number
  private initialHeight: number

  constructor() { }

  startResize(event: MouseEvent) {
    this.isResizing = true;
    this.initialWidth = this.canvas.nativeElement.offsetWidth;
    this.initialHeight = this.canvas.nativeElement.offsetHeight;
  }

  resize(event: MouseEvent) {
    if (!this.isResizing) return;

    const newWidth = this.initialWidth + event.clientX - this.canvas.nativeElement.getBoundingClientRect().left
    const newHeight = this.initialHeight + event.clientY - this.canvas.nativeElement.getBoundingClientRect().top

    this.canvas.nativeElement.style.width = newWidth + 'px'
    this.canvas.nativeElement.style.height = newHeight + 'px'
  }

  stopResize() {
    this.isResizing = false
  }
}
