import { Component, OnInit } from '@angular/core';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SemilleroObtenerService } from '../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index-ver-semillero',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,RouterLinkActive,ReactiveFormsModule
  ],
  templateUrl: './index-ver-semillero.component.html',
  styleUrl: './index-ver-semillero.component.css'
})
export class IndexVerSemilleroComponent implements OnInit {
  //campos de visualizacion del semillero
  protected id!: string;
  protected nombre: string = '';
  protected semillero: Respuesta<SemilleroProyeccion>
  constructor(
    private route: ActivatedRoute,
    private semilleroObtenerService: SemilleroObtenerService,
  ) {
    this.semillero = new Respuesta<SemilleroProyeccion>
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.id).subscribe({
        next: (respuesta) => {
          this.semillero = respuesta;
          this.nombre=this.semillero.data.nombre;
        }
      })
    });
  }

}
