import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { PaletteComponent } from './palette.component'
import { ColorService } from '../services/color.service'

describe('PaletteComponent', () => {
  let component: PaletteComponent
  let fixture: ComponentFixture<PaletteComponent>
  let colorService: ColorService
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaletteComponent],
      imports: [FormsModule]
    })
    fixture = TestBed.createComponent(PaletteComponent)
    component = fixture.componentInstance
    colorService = TestBed.inject(ColorService)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set color', () => {
    const color = 'blue';
    component.setColor(color);
    expect(component.selectedColor).toBe(color);
    colorService.getColor().subscribe((result) => {
      expect(result).toBe(color)
    })
  })
})
