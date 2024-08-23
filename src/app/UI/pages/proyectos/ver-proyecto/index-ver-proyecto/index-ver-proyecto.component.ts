import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { ProyectoInformaciónDetalladaProyección } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoInformaciónDetalladaProyección';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { EnumTranslationService } from '../../../../../service/common/enum-translation.service';
import { EstadoProyecto } from '../../../../../service/proyecto/domain/model/enum/estadoProyecto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-index-ver-proyecto',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './index-ver-proyecto.component.html',
  styleUrl: './index-ver-proyecto.component.css'
})
export class IndexVerProyectoComponent implements OnInit{

  // Informacion del Proyecto proveniente del Back
  protected registroInformacionDetallada: Respuesta<ProyectoInformaciónDetalladaProyección>;
  protected estadoProyectoEnum = EstadoProyecto;
  
  // Formulario reactivo con la inforacion del Proyecto
  protected informacionProyecto: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private proyectoObtenerService: ProyectoObtenerService,
    protected enumTranslationService: EnumTranslationService
  ){
    this.registroInformacionDetallada = new Respuesta();
    this.informacionProyecto = this.formBuilder.group({});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.proyectoObtenerService.obtenerInformaciónDetallada(params['id']);
      this.proyectoObtenerService.getRegistroInformacionDetallada().subscribe({
        next: (respuesta) => {
          this.registroInformacionDetallada = respuesta;
        }
      });

    });   
  }
}
