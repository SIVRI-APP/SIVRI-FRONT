import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { DescripcionSemilleroComponent } from '../descripcion-semillero/descripcion-semillero.component';
import { SemilleroObtenerService } from '../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';

@Component({
  selector: 'app-ver-semillero',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './ver-semillero.component.html',
  styleUrl: './ver-semillero.component.css'
})
export class VerSemilleroComponent implements OnInit {
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
      console.log('id semilleroo ' + this.id);
      this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.id).subscribe({
        next: (respuesta) => {
          console.log("semillero ------------------------")
          console.log(respuesta)
          this.semillero = respuesta;
          this.nombre=this.semillero.data.nombre;
        }
      })
    });
  }

}
