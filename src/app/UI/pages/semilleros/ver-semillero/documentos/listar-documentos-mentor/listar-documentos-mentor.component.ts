import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentoSemilleroService } from '../../../../../../service/semilleros/domain/service/documento-semillero.service';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ErrorData } from '../../../../../../service/common/model/errorData';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBadComponent } from '../../../../../shared/modal-bad/modal-bad.component';
import { TipoDocumentoSemillero } from '../../../../../../service/semilleros/domain/model/enum/tipoDocumentoSemillero';
import { ModalOkComponent } from '../../../../../shared/modal-ok/modal-ok.component';

@Component({
  selector: 'app-listar-documentos-mentor',
  standalone: true,
  imports: [],
  templateUrl: './listar-documentos-mentor.component.html',
  styleUrl: './listar-documentos-mentor.component.css'
})
export class ListarDocumentosMentorComponent implements OnInit {
  protected idSemillero!: string;
  selectedFileAval!: File;
  selectedFileOtro!: File;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  protected respuestaDocumento: Respuesta<boolean>;
  constructor(
    private route: ActivatedRoute,
    private documentoSemilleroService: DocumentoSemilleroService,
  ){
    this.respuestaDocumento= new Respuesta<false>();
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id']
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
