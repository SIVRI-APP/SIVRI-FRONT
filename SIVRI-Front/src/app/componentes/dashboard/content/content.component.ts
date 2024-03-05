import { Component } from '@angular/core';
import { UsuarioSolicitudObtenerService } from '../../../../SIVRI/Usuario/domain/services/usuario-solicitud-obtener.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  constructor(private usuarioSolicitudObtenerCUService: UsuarioSolicitudObtenerService){}

  ngOnInit(): void {
    this.usuarioSolicitudObtenerCUService.listarConFiltro().subscribe({
      next: (respuesta) => {
        console.log(respuesta); 
      },
      error: (errorData) => {
        console.error(errorData);
      },
      complete: () => {

      },
    });
  }
}
