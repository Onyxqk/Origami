import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { CanvasComponent } from './canvas/canvas.component'
import { PaletteComponent } from './palette/palette.component'

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    PaletteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
