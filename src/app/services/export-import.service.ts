import { Injectable } from '@angular/core'

@Injectable()
export class ExportImportService {
  exportImage(canvas: HTMLCanvasElement, format: 'png' | 'jpeg'): void {
    const dataURL = canvas.toDataURL(`image/${format}`)
    const fileName = `canvas-export.${format}`
    
    const link = document.createElement('a')
    link.href = dataURL
    link.download = fileName
    link.click()
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