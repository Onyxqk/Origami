import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CanvasComponent } from './canvas.component'
import { BrushService } from '../services/brush.service'
import { ColorService } from '../services/color.service'
import { ExportImportService } from '../services/export-import.service'
import { of } from 'rxjs'

describe('CanvasComponent', () => {
  let component: CanvasComponent
  let fixture: ComponentFixture<CanvasComponent>
  let brushService: BrushService
  let colorService: ColorService
  let exportImportService: ExportImportService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
      providers: [ColorService, ExportImportService],
    })

    fixture = TestBed.createComponent(CanvasComponent)
    component = fixture.componentInstance
    brushService = TestBed.inject(BrushService)
    colorService = TestBed.inject(ColorService)
    exportImportService = TestBed.inject(ExportImportService)
    component.ctx = {
      beginPath: jasmine.createSpy('beginPath'),
      moveTo: jasmine.createSpy('moveTo'),
      lineTo: jasmine.createSpy('lineTo'),
      stroke: jasmine.createSpy('stroke'),
      closePath: jasmine.createSpy('closePath'),
    } as unknown as CanvasRenderingContext2D
  })

  afterEach(() => {
    if (component.brushSubscription) {
      component.brushSubscription.unsubscribe()
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should start drawing', () => {
    const mockMouseEvent = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100,
    })

    component.startDrawing(mockMouseEvent)

    expect(component.isDrawing).toBe(true)
    expect(component.ctx.beginPath).toHaveBeenCalled()
    expect(component.ctx.moveTo).toHaveBeenCalledWith(-300, -5)
  })

  it('should continue drawing when isDrawing is true', () => {
    component.isDrawing = true
    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 200,
    })

    component.draw(mockMouseEvent)

    expect(component.ctx.lineTo).toHaveBeenCalledWith(-200, 95)
    expect(component.ctx.stroke).toHaveBeenCalled()
  })

  it('should not draw when isDrawing is false', () => {
    component.isDrawing = false
    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 200,
    })

    component.draw(mockMouseEvent)

    expect(component.ctx.lineTo).not.toHaveBeenCalled()
    expect(component.ctx.stroke).not.toHaveBeenCalled()
  })

  it('should stop drawing', () => {
    component.isDrawing = true
    const mockMouseEvent = new MouseEvent('mouseup')

    component.stopDrawing()

    expect(component.isDrawing).toBe(false)
    expect(component.ctx.closePath).toHaveBeenCalled()
  })

  it('should start resizing', () => {
    const mockMouseEvent = new MouseEvent('mousedown', {
      clientX: 300,
      clientY: 300,
    })

    component.startResize(mockMouseEvent)

    expect(component.isResizing).toBe(true)
    expect(component.initialWidth).toBe(component.canvas.nativeElement.offsetWidth)
    expect(component.initialHeight).toBe(component.canvas.nativeElement.offsetHeight)
    expect(component.initialX).toBe(300)
    expect(component.initialY).toBe(300)
  })

  it('should continue resizing when isResizing is true', () => {
    component.isResizing = true
    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 400,
      clientY: 400,
    })

    const initialWidth = component.canvas.nativeElement.offsetWidth
    const initialHeight = component.canvas.nativeElement.offsetHeight

    component.resize(mockMouseEvent)

    const newWidth = initialWidth + (400 - component.initialX)
    const newHeight = initialHeight + (400 - component.initialY)

    expect(component.canvas.nativeElement.style.width).toBe('')
    expect(component.canvas.nativeElement.style.height).toBe('')
  })

  it('should not resize when isResizing is false', () => {
    component.isResizing = false
    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 400,
      clientY: 400,
    })

    const initialWidth = component.canvas.nativeElement.offsetWidth
    const initialHeight = component.canvas.nativeElement.offsetHeight

    component.resize(mockMouseEvent)

    expect(component.canvas.nativeElement.style.width).toBe('')
    expect(component.canvas.nativeElement.style.height).toBe('')
  })

  it('should stop resizing', () => {
    component.isResizing = true
    const mockMouseEvent = new MouseEvent('mouseup')

    component.stopResize()

    expect(component.isResizing).toBe(false)
  })

  it('should set thin line width', () => {
    spyOn(brushService, 'getLineWidth').and.returnValue(of(component.thinLineWidth))

    expect(component.brushSubscription).toBeDefined();

    component.brushSubscription?.add(() => {
      expect(component.ctx.lineWidth).toBe(component.thinLineWidth)
    })
  })

  it('should set medium line width', () => {
    spyOn(brushService, 'getLineWidth').and.returnValue(of(component.mediumLineWidth))

    expect(component.brushSubscription).toBeDefined();

    component.brushSubscription?.add(() => {
      expect(component.ctx.lineWidth).toBe(component.mediumLineWidth)
    })
  })

  it('should set thick line width', () => {
    spyOn(brushService, 'getLineWidth').and.returnValue(of(component.thickLineWidth))

    expect(component.brushSubscription).toBeDefined();

    component.brushSubscription?.add(() => {
      expect(component.ctx.lineWidth).toBe(component.thickLineWidth)
    })
  })
})