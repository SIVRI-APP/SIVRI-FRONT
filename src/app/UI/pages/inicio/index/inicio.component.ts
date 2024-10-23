import { Component } from '@angular/core';
import { ModalService } from '../../../../service/common/modalService';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  constructor(private modalService: ModalService){}

  modal(){
    this.modalService.openModalConfirmacion("Eliminar", "¿Está seguro de eliminar el grupo de investigación?")
    .subscribe((response: boolean) => {
      console.log(response)
    });
  }
  
}
