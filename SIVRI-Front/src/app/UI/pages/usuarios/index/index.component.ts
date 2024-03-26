import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    // Navegar a otro componente inmediatamente
    this.router.navigate(['listar'], { relativeTo: this.route });
  }
}
