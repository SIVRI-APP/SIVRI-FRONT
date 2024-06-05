import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioSolicitudObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioSolicitudObtener.service';



@Component({
  selector: 'app-index-ver-solicitud-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-solicitud-usuario.component.html',
  styleUrl: './index-ver-solicitud-usuario.component.css'
})
export class IndexVerSolicitudUsuarioComponent implements OnInit{
  
  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private usuarioSolicitudObtenerService: UsuarioSolicitudObtenerService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.usuarioSolicitudObtenerService.obtenerSolicitudUsuarioInformaciónDetallada(this.id)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            this.nombre = respuesta.data.nombre + ' ' + respuesta.data.apellido;

            console.log(respuesta)
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });   
  }

}
