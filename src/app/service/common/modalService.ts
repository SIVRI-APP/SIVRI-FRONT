import { inject, Injectable } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOkComponent } from "../../UI/shared/modal-ok/modal-ok.component";
import { Router } from "@angular/router";
import { ModalBadComponent } from "../../UI/shared/modal-bad/modal-bad.component";
import { ErrorData } from "./model/errorData";
import { ModalConfirmacionComponent } from "../../UI/shared/modal-confirmacion/modal-confirmacion.component";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    // Inyeccion de Modal
    private modalService = inject(NgbModal);

    constructor(private router: Router,) {}

    openModalOk(message: string, nuevaUrl?: any) {
        const modalRef = this.modalService.open(ModalOkComponent);
        modalRef.componentInstance.name = message;

        modalRef.result.then((result) => {
            // Este bloque se ejecutará cuando se cierre la modal
            if (result === 'navegar' && nuevaUrl) {
            // Aquí puedes realizar la navegación a otra ruta
                this.router.navigate([nuevaUrl]);
            }
        });
    }
    
    openModalBad(data: ErrorData) {
        const modalRef = this.modalService.open(ModalBadComponent);
        modalRef.componentInstance.mensaje = data;
    }

    openModalConfirmacion(titulo: string, mensaje: string): Observable<boolean>{
        const modalRef = this.modalService.open(ModalConfirmacionComponent);
        modalRef.componentInstance.titulo = titulo;
        modalRef.componentInstance.mensaje = mensaje;

        // Capture the emitted response
        return modalRef.componentInstance.aceptar;
    }
}