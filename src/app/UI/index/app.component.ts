import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-router-auth';

  constructor(
		config: NgbModalConfig,
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}
}
