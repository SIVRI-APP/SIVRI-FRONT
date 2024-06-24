import { Component, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ActivatedRoute } from '@angular/router';
import { ProgramaObtenerService } from '../../../../../../service/academica/domain/service/programa-obtener.service';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { ListarProgramas } from '../../../../../../service/academica/domain/model/proyecciones/listarProgramas';
import { SemilleroProgramaCrearService } from '../../../../../../service/semilleros/domain/service/semillero-programa-crear.service';

@Component({
  selector: 'app-crear-programa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-programa.component.html',
  styleUrl: './crear-programa.component.css'
})
export class CrearProgramaComponent implements OnInit {
  protected idSemillero!: string;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  protected programasxdepartamento: ListarProgramas[] = [];
  @Output() mostrarCreaPrograma: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private programaObtenerService: ProgramaObtenerService,
    private programaSemilleroCrearService:SemilleroProgramaCrearService,
  ) {
    this.mostrarCreaPrograma = true;
    this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      programa: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];
      this.formulario.get('idSemillero')?.setValue(this.idSemillero);
    });

    this.obtenerProgramasxDepartamento();
  }
  obtenerProgramasxDepartamento() {
    this.programaObtenerService.obtenerProgramasxdepartamento(this.idSemillero).subscribe({
      next: (respuesta) => {
        this.programasxdepartamento = respuesta.data;
      }
    });
  }
  onsubmit() {
    if(this.formulario.valid){
      console.log(this.formulario)
      console.log(this.idSemillero);
      this.programaSemilleroCrearService.crearProgramaSemillero(this.idSemillero,this.formulario.value.programa).subscribe({
        next:(respuesta)=>{
          console.log(respuesta)
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
    }else {
      this.formulario.markAllAsTouched();
    }
  }
  limpiarCampos() {
    this.formulario = this.formBuilder.group({
      idSemillero: [''],
      programa: ['', Validators.required],
    });
  }
  openModalBad(data: ErrorData) {
    const modalRef = this.modalService.open(ModalBadComponent);
    modalRef.componentInstance.mensaje = data;
  }

}
