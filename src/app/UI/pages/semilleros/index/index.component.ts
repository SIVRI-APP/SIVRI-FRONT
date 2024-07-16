import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,RouterLinkActive
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  construsctor() { }

}
