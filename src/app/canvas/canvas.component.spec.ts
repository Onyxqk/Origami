import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CanvasComponent } from './canvas.component'

describe('CanvasComponent', () => {
  let component: CanvasComponent
  let fixture: ComponentFixture<CanvasComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent]
    })
    fixture = TestBed.createComponent(CanvasComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('startResize should set isResizing and initial values', () => {
    const event = new MouseEvent('mousedown')
    spyOn(component.canvas.nativeElement, 'offsetWidth' as never).and.returnValue(100 as never)
    spyOn(component.canvas.nativeElement, 'offsetHeight' as never).and.returnValue(100 as never)

    component['startResize'](event)

    expect(component['isResizing']).toBe(true)
    expect(component['initialWidth']).toBe(300)
    expect(component['initialHeight']).toBe(150)
    expect(component['initialX']).toBe(event.clientX)
    expect(component['initialY']).toBe(event.clientY)
  })

  it('resize should update the canvas size if isResizing is true', () => {
    const event = new MouseEvent('mousemove');
    component['isResizing'] = true
    component['initialWidth'] = 100
    component['initialHeight'] = 100
    component['initialX'] = 50
    component['initialY'] = 50

    component['resize'](event)

    expect(component.canvas.nativeElement.style.width).toBe('50px')
    expect(component.canvas.nativeElement.style.height).toBe('50px')
  })

  it('resize should not update the canvas size if isResizing is false', () => {
    const event = new MouseEvent('mousemove')
    component['isResizing'] = false
    component['resize'](event)

    expect(component.canvas.nativeElement.style.width).toBe('')
    expect(component.canvas.nativeElement.style.height).toBe('')
  })

  it('stopResize should set isResizing to false', () => {
    component['stopResize']()

    expect(component['isResizing']).toBe(false)
  })
})
