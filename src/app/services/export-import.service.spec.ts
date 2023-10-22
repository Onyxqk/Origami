import { TestBed } from '@angular/core/testing'
import { ExportImportService } from './export-import.service'

describe('ExportImportService', () => {
  let service: ExportImportService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportImportService],
    })
    service = TestBed.inject(ExportImportService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should export to PNG', () => {
    const canvas = document.createElement('canvas')
    const linkClickSpy = spyOn(document as any, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy(),
    })

    service.exportImage(canvas, 'png')

    expect(linkClickSpy).toHaveBeenCalled()
  })

  it('should export to JPEG', () => {
    const canvas = document.createElement('canvas')
    const linkClickSpy = spyOn(document as any, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy(),
    })

    service.exportImage(canvas, 'jpeg')

    expect(linkClickSpy).toHaveBeenCalled()
  })

  it('should export to SVG', () => {
    const canvas = document.createElement('canvas')
    spyOn(document as any, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy(),
    })
    spyOn(URL, 'revokeObjectURL')

    service.exportImage(canvas, 'svg')

    expect(document.createElement).toHaveBeenCalled()
    expect(URL.revokeObjectURL).toHaveBeenCalled()
  })

  it('should import an image', () => {
    const fileReader = new FileReader()
    spyOn(window, 'FileReader').and.returnValue(fileReader)
    spyOn(fileReader, 'readAsDataURL')
    spyOn(fileReader, 'addEventListener').and.callFake((event, callback) => {
      if (event === 'load') {
        callback(new Event('load'))
      }
    })

    const input = document.createElement('input')
    const canvas = document.createElement('canvas')
    spyOn(document, 'createElement').and.returnValue(input)
    const changeEvent = document.createEvent('Event')
    changeEvent.initEvent('change', true, true)
    input.dispatchEvent(changeEvent)
    
    service.importImage(input, canvas)
    expect(service.importImage(input, canvas))
  })
 
})