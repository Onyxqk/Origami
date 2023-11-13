import { TestBed } from '@angular/core/testing'
import { TextService } from './text.service'
import { ColorService } from './color.service'
import { of } from 'rxjs'
describe('TextService', () => {
  let service: TextService
  let colorServiceSpy: jasmine.SpyObj<ColorService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ColorService', ['getColor'])
    TestBed.configureTestingModule({
      providers: [TextService, { provide: ColorService, useValue: spy }]
    })
    service = TestBed.inject(TextService)
    colorServiceSpy = TestBed.inject(ColorService) as jasmine.SpyObj<ColorService>
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should draw text with the correct styling', () => {
    const ctx = createMockCanvasRenderingContext2D()
    const x = 10
    const y = 20
    const text = 'Hello, World!'
    const color = 'red'
    colorServiceSpy.getColor.and.returnValue(of(color))
    service.drawText(ctx, x, y, text)
    expect(ctx.fillStyle).toBe('red')
  })

  function createMockCanvasRenderingContext2D(): CanvasRenderingContext2D {
    return jasmine.createSpyObj<CanvasRenderingContext2D>('CanvasRenderingContext2D', ['fillText'])
  }
})