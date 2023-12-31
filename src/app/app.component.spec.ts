import { TestBed } from '@angular/core/testing'
import { CanvasComponent } from './canvas/canvas.component'
import { AppComponent } from './app.component'
import { PaletteComponent } from './palette/palette.component'

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, CanvasComponent, PaletteComponent]
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'Origami'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('Origami')
  })
})