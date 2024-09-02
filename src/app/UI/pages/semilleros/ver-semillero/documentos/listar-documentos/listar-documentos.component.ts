import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentoSemilleroService } from '../../../../../../service/semilleros/domain/service/documento-semillero.service';
import { SemilleroObtenerService } from '../../../../../../service/semilleros/domain/service/semillero-obtener.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { SemilleroProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/semilleroProyeccion';
import { ListarDocumentoSemilleroProyeccion } from '../../../../../../service/semilleros/domain/model/proyecciones/ListarDocumentoSemilleroProyeccion';
import { EstadoDocumentoSemillero } from '../../../../../../service/semilleros/domain/model/enum/estadoDocumentoSemillero';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoSemillero } from '../../../../../../service/semilleros/domain/model/enum/tipoDocumentoSemillero';
import { NotificationAlertService } from '../../../../../../service/common/notification-alert.service';
// Declara Bootstrap si no está tipado
declare var bootstrap: any;
@Component({
  selector: 'app-listar-documentos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './listar-documentos.component.html',
  styleUrl: './listar-documentos.component.css'
})
export class ListarDocumentosComponent implements OnInit{
  protected idSemillero!: string;
  selectedFileAval!: File;
  selectedFileOtro!: File;
  //formulario reactivo
  protected formulario: FormGroup;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  protected respuestaSemilleroInfo?: SemilleroProyeccion;
  protected respuestaDocumento: Respuesta<boolean>;
  protected respuestaInfoDocuemntoSemilleroAval!:Respuesta<ListarDocumentoSemilleroProyeccion>;
  protected respuestaInfoDocuemntoSemilleroOtros!:Respuesta<ListarDocumentoSemilleroProyeccion>;
  protected estadoDocumentoAval:EstadoDocumentoSemillero= EstadoDocumentoSemillero.NO_ANEXADO;
  protected estadoDocumentoOtro:EstadoDocumentoSemillero= EstadoDocumentoSemillero.NO_ANEXADO;

  // Variables para manejar el modal de observación
  currentObservacion: string = 'Sin observación';
  modalInstance: any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private documentoSemilleroService: DocumentoSemilleroService,
    private semilleroObtenerService: SemilleroObtenerService,
    private notificationAlertService: NotificationAlertService,
  ){
    this.respuestaDocumento= new Respuesta<false>();
    this.formulario = this.formBuilder.group({
      estadoAval: ['NO_ANEXADO'],
      estadoOtro: ['NO_ANEXADO'],
      observacionAval: [''],
      observacionOtro: [''],
      observacion: ['']
    })
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
    });
    this.obtenerInfoSemilleroxId();
    this.obtenerInfoDocumentoSemillero();
  }

  obtenerInfoDocumentoSemillero(){
    const tipoAval='AVAL_DEPARTAMENTO';
    this.documentoSemilleroService.obtenerDocumentoSemilleroxsemilleroIdyTipo(this.idSemillero,tipoAval).subscribe({
      next:(respuesta)=>{

        console.log(respuesta.data.estado);
        this.respuestaInfoDocuemntoSemilleroAval=respuesta;
        if(this.respuestaInfoDocuemntoSemilleroAval.status!=400){
          this.estadoDocumentoAval=this.respuestaInfoDocuemntoSemilleroAval.data.estado;
          this.formulario.get('estadoAval')?.setValue(this.estadoDocumentoAval);
          this.formulario.get('observacionAval')?.setValue(this.respuestaInfoDocuemntoSemilleroAval.data.observacion)
        }
      }
    });
    const tipoOtros='OTROS';
    this.documentoSemilleroService.obtenerDocumentoSemilleroxsemilleroIdyTipo(this.idSemillero,tipoOtros).subscribe({
      next:(respuesta)=>{
        console.log(respuesta);
        this.respuestaInfoDocuemntoSemilleroOtros=respuesta;
        if(this.respuestaInfoDocuemntoSemilleroOtros.status!=400){
          this.estadoDocumentoOtro=this.respuestaInfoDocuemntoSemilleroOtros.data.estado;
          this.formulario.get('estadoOtro')?.setValue(this.estadoDocumentoOtro);
          this.formulario.get('observacionOtro')?.setValue(this.respuestaInfoDocuemntoSemilleroOtros.data.observacion)
        }
      }
    });
  }
  actualizarDocumentoSemillero(){
    console.log(this.formulario);

    const tipoDocumentoMap = {
      [TipoDocumentoSemillero.AVAL_DEPARTAMENTO]: 'AVAL_DEPARTAMENTO',
      [TipoDocumentoSemillero.OTROS]: 'OTROS'
    };

    if(this.respuestaInfoDocuemntoSemilleroAval.data.tipo === tipoDocumentoMap[TipoDocumentoSemillero.AVAL_DEPARTAMENTO]){

      this.documentoSemilleroService.actualizarDocumentoSemillero(
        this.respuestaInfoDocuemntoSemilleroAval.data.id,{
          observacion:this.formulario.value.observacionAval,
          estado: this.formulario.value.estadoAval
        }).subscribe({
          next:(respuesta)=>{
            console.log(respuesta);
            if (this.modalInstance) {
              this.modalInstance.hide();
            }
            this.notificationAlertService.showAlert('',respuesta.userMessage,3000);
          }
        });
    }
    if(this.respuestaInfoDocuemntoSemilleroOtros.data.tipo === tipoDocumentoMap[TipoDocumentoSemillero.OTROS]){

      this.documentoSemilleroService.actualizarDocumentoSemillero(
        this.respuestaInfoDocuemntoSemilleroOtros.data.id,{
          observacion:this.formulario.value.observacionOtro,
          estado: this.formulario.value.estadoOtro
        }).subscribe({
          next:(respuesta)=>{
            console.log(respuesta);
            if (this.modalInstance) {
              this.modalInstance.hide();
            }
            this.notificationAlertService.showAlert('','Actualización Exitosa',3000);
          }
        });
    }

  }
  cancelar(){
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  // Método para abrir el modal con la observación
  openObservacionAval(observacion: string) {

    if(observacion!=null || observacion!=""){
      this.currentObservacion = observacion;
    }

      // Obtener el elemento del modal
      const modalElement = document.getElementById('observacionModalAval');
      if (modalElement) {
        // Crear una instancia de Bootstrap Modal
        this.modalInstance = new bootstrap.Modal(modalElement);
        // Mostrar el modal
        this.modalInstance.show();
      }

  }
  // Método para abrir el modal con la observación
  openObservacionOtro(observacion: string) {
    if(observacion!=null || observacion!=""){
      this.currentObservacion = observacion;
    }
    // Obtener el elemento del modal
      const modalElement = document.getElementById('observacionModalOtro');
      if (modalElement) {
        // Crear una instancia de Bootstrap Modal
        this.modalInstance = new bootstrap.Modal(modalElement);
        // Mostrar el modal
        this.modalInstance.show();
      }
  }
  // Método opcional para cerrar el modal si lo necesitas programáticamente
  closeObservacion() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  obtenerInfoSemilleroxId(){
    this.semilleroObtenerService.obtenerSemilleroInformacionDetallada(this.idSemillero).subscribe({
      next:(respuesta)=>{
        this.respuestaSemilleroInfo=respuesta.data;
      }
    });
  }
  downloadAval(){
    const tipo= 'AVAL_DEPARTAMENTO';
    this.documentoSemilleroService.descargarDocumento(this.idSemillero,tipo).subscribe(blob=>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `archivoAval_${this.idSemillero}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  downloadOtro(){
    const tipoo= 'OTROS';
    this.documentoSemilleroService.descargarDocumento(this.idSemillero,tipoo).subscribe(blob=>{
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `archivoOtros_${this.idSemillero}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  triggerFileUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }
  onFileSelectedAval(event: Event) {
    const tipo= 'AVAL_DEPARTAMENTO';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileAval = input.files[0];
      if (this.selectedFileAval.type === 'application/pdf') {
       this.fileContent(this.selectedFileAval,this.idSemillero,tipo);
      } else {
        alert('El archivo debe ser un PDF.');
      }
    }
  }
  onFileSelectedOtro(event: Event){
    const tipo='OTROS';
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileOtro = input.files[0];
      if (this.selectedFileOtro.type === 'application/pdf') {
       this.fileContent(this.selectedFileOtro,this.idSemillero,tipo);
      } else {
        alert('El archivo debe ser un PDF.');
      }
    }
  }
  fileContent(selectedFile:any,idSemillero:string,tipoDocumento: string){
    // let selectedFile = event.target.files[0] as File;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
    const base64File = reader.result?.toString().split(',')[1]; // Obtener la parte base64 sin el prefijo

    this.documentoSemilleroService.subirDocumentosSemillero(idSemillero,tipoDocumento,base64File!,selectedFile.name).subscribe({
      next:(respuesta)=>{
        console.log('respuesta');
        console.log(respuesta);
        this.respuestaDocumento= respuesta;
        this.openModalOk(this.respuestaDocumento.userMessage);

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

     };
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
