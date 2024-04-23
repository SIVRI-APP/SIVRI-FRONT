import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-ver-solicitud-usuario',
  standalone: true,
  imports: [],
  templateUrl: './ver-solicitud-usuario.component.html',
  styleUrl: './ver-solicitud-usuario.component.css'
})
export class VerSolicitudUsuarioComponent implements OnInit {

  id!: string;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // 'id' debe coincidir con el nombre del parámetro en la ruta
      console.log(this.id); // Esto imprimirá el ID en la consola
    });

    
  }



}
