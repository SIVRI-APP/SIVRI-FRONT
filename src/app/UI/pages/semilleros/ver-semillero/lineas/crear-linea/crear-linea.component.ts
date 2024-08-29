import { Component, OnInit, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaInvestigacionCrearService } from '../../../../../../service/semilleros/domain/service/linea-investigacion-crear.service';
import { CommunicationComponentsService } from '../../../../../../service/common/communication-components.service';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';

@Component({
  selector: 'app-crear-linea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-linea.component.html',
  styleUrl: './crear-linea.component.css'
})
export class CrearLineaComponent implements OnInit {
  protected idSemillero!: string;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  @Output() mostrarCreaLinea: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private actualizarListarService: CommunicationComponentsService,
    private lineaInvestigacionCrearService: LineaInvestigacionCrearService,
    private notificationAlertService: NotificationAlertService,
  ) {
    this.mostrarCreaLinea = true;
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      linea: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],

    });
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];

    })
  }

  onsubmit() {
    // Verificar si el formulario es válido

    if (this.formulario.valid) {
      this.lineaInvestigacionCrearService.crearLineaInvestigacion({
        semilleroId: this.idSemillero,
        linea: this.formulario.value.linea
      }).subscribe({
        next: (respuesta) => {
          this.respuesta = respuesta;
          this.openModalOk(respuesta.userMessage);
          this.actualizarListarService.notificarActualizarListar('agregar')
          this.mostrarCreaLinea = false;
        },
        // Manejar errores
        error: (errorData) => {
          // Verificar si el error es del tipo esperado
          if (errorData.error && errorData.error.data) {
            let respuesta: Respuesta<ErrorData> = errorData.error;
            this.openModalBad(respuesta.data);
          } else {
            // Manejar errores inesperados
            this.openModalBad(new ErrorData({ error: "Error inseperado, contactar a soporte" }));
          }
        }
      });

    } else {
      this.formulario.markAllAsTouched();
    }
  }

  cancelar() {
    this.mostrarCreaLinea= false;
    this.actualizarListarService.notificarActualizarListar('cancelar');
    this.notificationAlertService.showAlert('','Accion Cancelada',3000);
  }

  openModalOk(message: string) {
    const modalRef = this.modalService.open(ModalOkComponent);
    modalRef.componentInstance.name = message;
    modalRef.result.then((result) => {
      // Este bloque se ejecutará cuando se cierre la modal
      if (result === 'navegar') {
        //cierra todas las modales
        this.modalService.dismissAll();
        //TODO FALTA QUE REDIRIJA A LISTAR
        //this.router.navigate([''])
      }

    });
  }

  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

}
