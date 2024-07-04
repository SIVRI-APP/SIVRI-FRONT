import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaInvestigacionObtenerService } from '../../../../../../service/semilleros/domain/service/linea-investigacion-obtener.service';
import { LineaInvestigacion } from '../../../../../../service/semilleros/domain/model/proyecciones/lineaInvestigacion';
import { LineaInvestigacionCrearService } from '../../../../../../service/semilleros/domain/service/linea-investigacion-crear.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';

@Component({
  selector: 'app-actualizar-linea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar-linea.component.html',
  styleUrl: './actualizar-linea.component.css'
})
export class ActualizarLineaComponent implements OnInit {
  private idLinea!:string;
  private idSemillero!:string
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  protected lineaDatos: Respuesta<LineaInvestigacion>;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private lineaInvestigacionObtenerService:LineaInvestigacionObtenerService,
    private lineaInvestigacionCrearService: LineaInvestigacionCrearService,
  ){
    this.lineaDatos= new Respuesta<LineaInvestigacion>();
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      idLinea: [''],
      linea: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(200)]],

    });
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
    });
    console.log('id semillero para on init-------'+this.idSemillero);
    this.route.params.subscribe(params => {
      this.idLinea = params['idLinea']
    });
    console.log('is de la linea capturada----- '+this.idLinea)
    //obtengo los datos de la linea
    this.lineaInvestigacionObtenerService.obtenerLineaxId(this.idLinea).subscribe({
      next:(respuesta)=>{
        this.lineaDatos=respuesta;
        this.formulario.get('linea')?.setValue(this.lineaDatos.data.linea);
      }
    });
  }
  onsubmit(){
    if (this.formulario.valid) {
      this.lineaInvestigacionCrearService.actualizarLineaInvestigacion(
        this.idLinea,{linea:this.formulario.value.linea}).subscribe({
          next:(respuesta)=>{
            this.respuesta=respuesta;
            this.openModalOk(respuesta.userMessage);
          },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({error: "Error inseperado, contactar a soporte"}));
          }
        }
        });
    }
  }
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        console.log('id semillero para la navegacion-------'+this.idSemillero);
        // Redirige a la ruta del componente ListarLineasComponent
      this.router.navigate([`semilleros/listar-semilleros/${this.idSemillero}/listar-lineas`]);

      }

    });
	}
  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}


}
