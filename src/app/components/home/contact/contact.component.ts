import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  readonly email = 'meydodev@gmail.com';
  asunto: string = '';
  mensaje: string = '';

  sendMail() {
    const subject = this.asunto.trim();
    const body = this.mensaje.trim();

    if (!subject || !body) return;

    const recipient = this.email;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }
}
