import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UsuarioObtenerService } from '../../../../../service/solicitudUsuarios/domain/service/usuarioObtener.service';

@Component({
  selector: 'app-index-ver-usuario',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-usuario.component.html',
  styleUrl: './index-ver-usuario.component.css'
})
export class IndexVerUsuarioComponent implements OnInit{

  //Campos que ayuda a la visualizacion
  protected id!: string;
  protected nombre: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private usuarioObtenerService: UsuarioObtenerService,
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 

      this.usuarioObtenerService.obtenerUsuarioInformaciónDetallada(this.id)
        .subscribe({
          // Manejar respuesta exitosa
          next: (respuesta) => {
            this.nombre = respuesta.data.nombre + ' ' + respuesta.data.apellido;
          },
          // Manejar errores
          error: (errorData) => {
            console.error(errorData);
          }
        });
    });   
  }
}
