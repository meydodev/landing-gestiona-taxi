import { Component } from '@angular/core';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  counterDownload = 0;

  downloadApp() {
    this.counterDownload++;
    console.log(`App downloaded ${this.counterDownload} times`);
  }
}
