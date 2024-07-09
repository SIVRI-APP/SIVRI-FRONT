import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SemilleroObservacionObtenerService } from '../../../../../../service/semilleros/domain/service/semillero-observacion-obtener.service';
import { ObservacionSemillero } from '../../../../../../service/semilleros/domain/model/proyecciones/observacionSemillero';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroObservacionCrearService } from '../../../../../../service/semilleros/domain/service/semillero-observacion-crear.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-editar-observacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './editar-observacion.component.html',
  styleUrl: './editar-observacion.component.css'
})
export class EditarObservacionComponent implements OnInit {
  protected formulario: FormGroup;
  protected idObservacion!: string;
  protected idSemillero!: string;
  protected respuestaConsulta!: ObservacionSemillero;
  protected respuesta: Respuesta<boolean>;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private observacionSemilleroObtenerService: SemilleroObservacionObtenerService,
    private semilleroObservacionCrearService:SemilleroObservacionCrearService,
    private notificationAlertService: NotificationAlertService,
  ){
    this.formulario = this.formBuilder.group({
      idObservacion: [''],
      observacion: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(1445)]],
    });
    this.respuesta= new Respuesta<false>();
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
    });
    console.log('ed del semillero desde editar observacion')
    console.log(this.idSemillero);
    this.route.params.subscribe(params => {
      this.idObservacion = params['idObservacion'];
      this.formulario.get('idObservacion')?.setValue(this.idObservacion);
    });
    this.obtenerObservacionxId();
  }
  obtenerObservacionxId(){
    this.observacionSemilleroObtenerService.obtenerObservacionxId(
      this.formulario.value.idObservacion).subscribe({
        next:(respuesta)=>{
          this.respuestaConsulta=respuesta.data;
          this.formulario.get('observacion')?.setValue(this.respuestaConsulta.observacion);
        }
      });
  }
  onsubmit(){
    this.semilleroObservacionCrearService.actualizarObservacionSemillero(
      this.formulario.value.idObservacion,{observacion: this.formulario.value.observacion}).subscribe({
        next:(respuesta)=>{
          this.respuesta = respuesta;
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
  cancelar(){
    this.formulario.get('observacion')?.setValue(this.respuestaConsulta.observacion);
    this.notificationAlertService.showAlert('','Observación no actualizada',3000);
    this.router.navigate([`semilleros/listar-semilleros/${this.idSemillero}/listar-observaciones`]);
  }
  openModalOk(message: string) {
		const modalRef = this.modalService.open(ModalOkComponent);
		modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        // Redirige a la ruta del componente ListarLineasComponent
      this.router.navigate([`semilleros/listar-semilleros/${this.idSemillero}/listar-observaciones`]);

      }

    });
	}

  openModalBad(data: ErrorData) {
		const modalRef = this.modalService.open(ModalBadComponent);
		modalRef.componentInstance.mensaje = data;
	}
}
