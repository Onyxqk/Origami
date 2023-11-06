import { Injectable } from '@angular/core'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

@Injectable()
export class ExportImportService {
  exportImage(canvas: HTMLCanvasElement, format: 'png' | 'jpeg' | 'svg' | 'pdf' | 'gif'): void {
    if (format === 'svg') {
      const svgString = this.canvasToSVG(canvas)
      const blob = new Blob([svgString], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'canvas-export.svg'
      link.click()
      
      URL.revokeObjectURL(url)
    }
    else if (format === 'pdf') {
      this.canvasToPDF(canvas)
    }
    else {
      const dataURL = canvas.toDataURL(`image/${format}`)
      const fileName = `canvas-export.${format}`
      
      const link = document.createElement('a')
      link.href = dataURL
      link.download = fileName
      link.click()
    }
  }

  canvasToPDF(canvas: HTMLCanvasElement): void {
    html2canvas(canvas).then((canvasImage) => {
      const imageData = canvasImage.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('canvas-export.pdf')
    })
  }

  canvasToSVG(canvas: HTMLCanvasElement): string {
    const serializer = new XMLSerializer()
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('width', canvas.width.toString())
    svg.setAttribute('height', canvas.height.toString())
  
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    image.setAttribute('x', '0')
    image.setAttribute('y', '0')
    image.setAttribute('width', canvas.width.toString())
    image.setAttribute('height', canvas.height.toString())
    image.setAttribute('href', canvas.toDataURL('image/png'))
  
    svg.appendChild(image)
  
    const svgString = serializer.serializeToString(svg)
  
    return svgString
  }
  
  importImage(input: HTMLInputElement, canvas: HTMLCanvasElement): void {
    input.type = 'file'
    input.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          const img = new Image()
          img.src = reader.result as string
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, img.width, img.height)
            }
          }
        }
        reader.readAsDataURL(file)
      }
    })
    input.click()
  }
}