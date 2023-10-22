import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Origami'
}

window.onclick = function (event) {
  if (!event.target.matches('.origami-button')) {
    const menu = document.getElementById("origamiMenu")
    if (menu.classList.contains('show')) {
      menu.classList.remove('show')
    }
  }
}