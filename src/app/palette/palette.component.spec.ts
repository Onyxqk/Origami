import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { PaletteComponent } from './palette.component'
import { BrushService } from '../services/brush.service'
import { ColorService } from '../services/color.service'

describe('PaletteComponent', () => {
  let component: PaletteComponent
  let fixture: ComponentFixture<PaletteComponent>
  let brushService: BrushService
  let colorService: ColorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaletteComponent],
      imports: [FormsModule]
    })
    fixture = TestBed.createComponent(PaletteComponent)
    component = fixture.componentInstance
    brushService = TestBed.inject(BrushService)
    colorService = TestBed.inject(ColorService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set color', () => {
    const color = 'blue'
    component.setColor(color)
    expect(component.selectedColor).toBe(color)
    colorService.getColor().subscribe((result) => {
      expect(result).toBe(color)
    })
  })

  it('should set thin line width', () => {
    const thinLineWidth = 1
    spyOn(brushService, 'setLineWidth').and.callThrough()
    component.lineWidth = thinLineWidth
    component.setLineWidth()
    expect(brushService.setLineWidth).toHaveBeenCalledWith(1)
  })

  it('should set medium line width', () => {
    const thinLineWidth = 5
    spyOn(brushService, 'setLineWidth').and.callThrough()
    component.lineWidth = thinLineWidth
    component.setLineWidth()
    expect(brushService.setLineWidth).toHaveBeenCalledWith(5)
  })


  it('should set thick line width', () => {
    const thinLineWidth = 10
    spyOn(brushService, 'setLineWidth').and.callThrough()
    component.lineWidth = thinLineWidth
    component.setLineWidth()
    expect(brushService.setLineWidth).toHaveBeenCalledWith(10)
  })
})
