import { Component, OnInit } from '@angular/core';
import { CompromisoSemilleroObtenerService } from '../../../../../../service/planTrabajo/domain/service/compromiso-semillero-obtener.service';
import { IntegrantesGrupoObtenerService } from '../../../../../../service/grupos/domain/service/integrantes-grupo-obtener.service';
import { ActivatedRoute } from '@angular/router';
import { SemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { CompromisoSemillero } from '../../../../../../service/planTrabajo/domain/model/proyecciones/compromisoSemillero';
import { IntegrantesMentores } from '../../../../../../service/grupos/domain/model/proyecciones/integrantesMentores';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [],
  templateUrl: './crear-actividad.component.html',
  styleUrl: './crear-actividad.component.css'
})
export class CrearActividadComponent implements OnInit {
  protected idSemillero!: string;
  protected idGrupo!: number ;
  protected semillero:Respuesta<SemilleroProyeccion>
  protected compromisosSemillero: Respuesta<CompromisoSemillero>
  protected integrantes: Respuesta<IntegrantesMentores>;
  constructor(
    private route: ActivatedRoute,
    private semilleroObtenerService: SemilleroObtenerService,
    private compromisosObtenerService: CompromisoSemilleroObtenerService,
    private integrantesGrupoObtenerService: IntegrantesGrupoObtenerService
  ){
    this.integrantes = new Respuesta<IntegrantesMentores>
    this.compromisosSemillero= new Respuesta<CompromisoSemillero>();
    this.semillero=new Respuesta<SemilleroProyeccion>();
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params=>{
      this.idSemillero=params['id'];
    });
    console.log('idsemillero de crear actividad---------'+this.idSemillero);
    this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.idSemillero).subscribe({
      next:(respuesta)=>{
        console.log(respuesta);
        this.semillero=respuesta;
        this.idGrupo= this.semillero.data.grupoId;
        console.log('id grupo dentro de el servicio --------'+this.idGrupo);
        this.integrantesGrupoObtenerService.obtenerMentores(this.idGrupo).subscribe({
          next:(respuesta)=>{
            console.log('respuesta de integrantes-----------');
            console.log(respuesta);
            this.integrantes= respuesta;

          }
        });
      }
    });

    this.compromisosObtenerService.obtenerCompromisosSemilleros().subscribe({
      next:(respuesta)=>{
        console.log('respuesta de compromisos------------');
        console.log(respuesta);
      },
      error: (errorData) => {
        console.log(errorData);
      }
    });

  }

  //borrar los datos ingresados en el filtro
  limpiarCampos(): void {

  }
}
