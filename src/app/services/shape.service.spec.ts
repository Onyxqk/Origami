import { TestBed } from '@angular/core/testing'
import { ShapeService } from './shape.service'
import { ColorService } from './color.service'
import { of } from 'rxjs'
describe('ShapeService', () => {
  let service: ShapeService
  let colorServiceSpy: jasmine.SpyObj<ColorService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ColorService', ['getColor'])
    TestBed.configureTestingModule({
      providers: [ShapeService, { provide: ColorService, useValue: spy }]

    })
    service = TestBed.inject(ShapeService)
    colorServiceSpy = TestBed.inject(ColorService) as jasmine.SpyObj<ColorService>;
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should draw a triangle', () => {
    const ctx = createMockCanvasRenderingContext2D()
    const x1 = 10
    const y1 = 20
    const x2 = 30
    const y2 = 40
    const x3 = 50
    const y3 = 60
    const color = 'blue'

    colorServiceSpy.getColor.and.returnValue(of(color))

    service.drawTriangle(ctx, x1, y1, x2, y2, x3, y3)

    expect(colorServiceSpy.getColor).toHaveBeenCalled()
    expect(ctx.strokeStyle).toBe(color)
    expect(ctx.beginPath).toHaveBeenCalled()
    expect(ctx.moveTo).toHaveBeenCalledWith(x1, y1)
    expect(ctx.lineTo).toHaveBeenCalledWith(x2, y2)
    expect(ctx.lineTo).toHaveBeenCalledWith(x3, y3)
    expect(ctx.closePath).toHaveBeenCalled()
    expect(ctx.stroke).toHaveBeenCalled()
  });

  it('should set the correct strokeStyle when drawing a rectangle', () => {
    const ctx = createMockCanvasRenderingContext2D()
    const x = 10
    const y = 20
    const sideLength = 30
    const color = 'red'

    colorServiceSpy.getColor.and.returnValue(of(color))

    service.drawRectangle(ctx, x, y, sideLength)

    expect(colorServiceSpy.getColor).toHaveBeenCalled()
    expect(ctx.strokeStyle).toBe(color)
    expect(ctx.beginPath).toHaveBeenCalled()
    expect(ctx.rect).toHaveBeenCalledWith(x, y, sideLength, sideLength)
    expect(ctx.closePath).toHaveBeenCalled()
    expect(ctx.stroke).toHaveBeenCalled()
  });

  it('should set the correct strokeStyle when drawing a circle', () => {
    const ctx = createMockCanvasRenderingContext2D()
    const x = 10;
    const y = 20;
    const radius = 30
    const color = 'green'

    colorServiceSpy.getColor.and.returnValue(of(color))

    service.drawCircle(ctx, x, y, radius)

    expect(colorServiceSpy.getColor).toHaveBeenCalled()
    expect(ctx.strokeStyle).toBe(color)
    expect(ctx.beginPath).toHaveBeenCalled()
    expect(ctx.arc).toHaveBeenCalledWith(x, y, radius, 0, 2 * Math.PI)
    expect(ctx.closePath).toHaveBeenCalled()
    expect(ctx.stroke).toHaveBeenCalled()
  });

  function createMockCanvasRenderingContext2D(): CanvasRenderingContext2D {
    return jasmine.createSpyObj<CanvasRenderingContext2D>('CanvasRenderingContext2D', ['beginPath', 'moveTo', 'lineTo', 'rect', 'arc', 'closePath', 'stroke'])
  }
});
