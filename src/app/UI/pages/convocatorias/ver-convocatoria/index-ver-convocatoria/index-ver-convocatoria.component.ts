import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConvocatoriaObtenerService } from '../../../../../service/convocatoria/domain/service/convocatoriaObtener.service';

@Component({
  selector: 'app-index-ver-convocatoria',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-convocatoria.component.html',
  styleUrl: './index-ver-convocatoria.component.css'
})
export class IndexVerConvocatoriaComponent implements OnInit{
  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private convocatoriaObtenerService: ConvocatoriaObtenerService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.convocatoriaObtenerService.obtenerSolicitudUsuarioInformaciónDetallada(this.id);
      this.convocatoriaObtenerService.getRegistroInformacionDetallada()
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            this.nombre = respuesta.data.nombre;
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });   
  }
}
