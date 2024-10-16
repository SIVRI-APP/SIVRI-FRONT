import { Component, OnInit } from '@angular/core';
import { VerProyectoService } from '../ver-proyecto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompromisosService } from '../../../../../service/proyecto/domain/service/compromisoService';
import { ProyectoObtenerService } from '../../../../../service/proyecto/domain/service/proyectoObtener.service';
import { Evidencias, ProyectoDetalladoDTO } from '../../../../../service/proyecto/domain/model/proyecciones/proyectoDetalladoDTO';
import { Respuesta } from '../../../../../service/common/model/respuesta';
import { PrepararAgregarCompromisoDTO } from '../../../../../service/proyecto/domain/model/proyecciones/prepararAgregarCompromisoDTO';
import { ModalService } from '../../../../../service/common/modalService';
import { ErrorData } from '../../../../../service/common/model/errorData';

@Component({
  selector: 'app-compromisos-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './compromisos-proyecto.component.html',
  styleUrl: './compromisos-proyecto.component.css'
})
export class CompromisosProyectoComponent implements OnInit{

  protected proyecto = new ProyectoDetalladoDTO();

  protected prepararAgregarCompromisoRespuesta = new PrepararAgregarCompromisoDTO();

  protected formularioAgregarCompromiso: FormGroup;

  protected mostrarAgregarCompromiso = false;

  protected productoSeleccionado: any

  constructor(
    protected verProyectoService: VerProyectoService,
    protected compromisosService: CompromisosService,
    private formBuilder: FormBuilder,
    private proyectoObtenerService: ProyectoObtenerService,
    private modalService: ModalService
  ) {
    this.formularioAgregarCompromiso = this.formBuilder.group({
      compromisoProyecto: ['', Validators.required],
      responsableCompromiso: ['', Validators.required]
    });
  }

  ngOnInit() {    
    this.verProyectoService.setTituloInstruccion("Compromisos del Proyecto");
    this.verProyectoService.setInstruccion("En esta sección se pueden gestionar los compromisos del Proyecto junto con la gestions de los documentos requeridos por cada compromiso");

    this.proyectoObtenerService.informacionDetalladaProyecto.subscribe({
      next: (respuesta) => {
        this.proyecto = respuesta.data
      }
    })
    
  }

  prepararAgregarCompromiso() {
    this.mostrarAgregarCompromiso = !this.mostrarAgregarCompromiso;

    if (this.mostrarAgregarCompromiso) {
      this.compromisosService.prepararAgregarCompromiso(this.proyecto.informacionDetalladaProyecto.id).subscribe({
        next: (respuesta: Respuesta<PrepararAgregarCompromisoDTO>) => {
          this.prepararAgregarCompromisoRespuesta = respuesta.data;
        }
      })
    }    
  }

  seleccionarProducto($event: Event) {
    const productoId = ($event.target as HTMLInputElement).value;
    this.productoSeleccionado = this.prepararAgregarCompromisoRespuesta.productos.find(producto => producto.id === parseInt(productoId));
  }

  agregarCompromiso(){
    if (this.formularioAgregarCompromiso.valid) {
      this.compromisosService.agregarCompromiso(
        this.proyecto.informacionDetalladaProyecto.id,
        this.formularioAgregarCompromiso.get("responsableCompromiso")!.value,
        this.formularioAgregarCompromiso.get("compromisoProyecto")!.value
      ).subscribe({
        next: (respuesta) => {
          this.limpiarFiltroAgregarCompromiso();
          this.modalService.openModalOk(respuesta.userMessage);
          window.location.reload();
        },
        error: (errorData) => {
          const errorResponse = errorData.error?.data ? errorData.error : new ErrorData({error: 'Error inseperado, contactar a soporte'});
          this.modalService.openModalBad(errorResponse);
        }
      })
    }else{
      this.formularioAgregarCompromiso.markAllAsTouched();
    }    
  }

  limpiarFiltroAgregarCompromiso() {
    this.formularioAgregarCompromiso = this.formBuilder.group({
      compromisoProyecto: ['', Validators.required],
      responsableCompromiso: ['', Validators.required]
    });
    this.mostrarAgregarCompromiso = !this.mostrarAgregarCompromiso;
    this.productoSeleccionado = null;
  }

  agregarDoc(event: Event, compromisoId: any) {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if(file) {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('organismo', "proyecto");
      formData.append('organismoId', this.proyecto.informacionDetalladaProyecto.id.toString());
      formData.append('documentoConvocatoriaId', compromisoId);

      this.compromisosService.cargarDocCompromiso(formData).subscribe({
        next: (respuesta) => {
          this.modalService.openModalOk(respuesta.userMessage);
        },
        error: (errorData) => {
          const errorResponse = errorData.error?.data ? errorData.error : new ErrorData({error: 'Error inseperado, contactar a soporte'});
          this.modalService.openModalBad(errorResponse);
        }
      });
    }
  }

  accion(accion: string, evidencia: Evidencias) {
    if (accion == "descargar") {
      let ruta: string = "proyecto/" + this.proyecto.informacionDetalladaProyecto.id + "/" + evidencia.id + "-" + evidencia.rutaAlmacenamiento;
      this.compromisosService.descargarDocCompromiso(ruta).subscribe((blob: Blob) => {
        // Crea un enlace para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = evidencia.rutaAlmacenamiento;
        document.body.appendChild(a);
        a.click();
  
        // Limpia el objeto URL después de la descarga
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error al descargar el archivo:', error);
      });
    }
  }

}
