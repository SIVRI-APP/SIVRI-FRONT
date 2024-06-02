import { Component, OnInit } from '@angular/core';
import { RolIntegranteSemillero } from '../../../../../service/semilleros/domain/model/proyecciones/rolIntegranteSemillero';
import { IntegranteSemilleroObtenerService } from '../../../../../service/semilleros/domain/service/integrante-semillero-obtener.service';

@Component({
  selector: 'app-crear-integrante',
  standalone: true,
  imports: [],
  templateUrl: './crear-integrante.component.html',
  styleUrl: './crear-integrante.component.css'
})
export class CrearIntegranteComponent implements OnInit {

  protected rolIntegranteSemillero: RolIntegranteSemillero[] = [];
  constructor(private integranteSemilleroObtenerService: IntegranteSemilleroObtenerService,){

  }
  ngOnInit(): void {
    this.rolIntegranteSemillero=this.integranteSemilleroObtenerService.getRolIntegranteSemillero();
  }

}
