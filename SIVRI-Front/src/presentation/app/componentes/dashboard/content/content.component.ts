import { Component } from '@angular/core';
import { UsuarioSolicitudObtenerAdapter } from '../../../../../SIVRI/Usuario/infraestructura/usuarioSolicitudObtener.adapter';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  constructor(private usuarioSolicitudObtenerAdapter:UsuarioSolicitudObtenerAdapter){}

  ngOnInit(): void {
    this.usuarioSolicitudObtenerAdapter.listarConFiltro().subscribe({
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
