import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { ReviewFormComponent } from "./review-form/review-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ContactComponent, ReviewFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
