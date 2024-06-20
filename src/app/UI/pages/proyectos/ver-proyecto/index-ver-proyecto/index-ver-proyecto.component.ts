import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';

@Component({
  selector: 'app-index-ver-proyecto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-proyecto.component.html',
  styleUrl: './index-ver-proyecto.component.css'
})
export class IndexVerProyectoComponent implements OnInit{
  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private proyectoObtenerService: ProyectoObtenerService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.proyectoObtenerService.obtenerInformaciónDetallada(this.id);
      this.proyectoObtenerService.getRegistroInformacionDetallada()
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
