import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notificacion-error',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notificacion-error.component.html',
  styleUrl: './notificacion-error.component.css'
})
export class NotificacionErrorComponent implements OnInit {
  @Input() title: string = ''; // Título de la alerta
  @Input() message: string = '';
  @Input() duration: number = 5000; // Tiempo por defecto en milisegundos (5 segundos)
  @Input() type: 'success' | 'warning' | 'error' = 'warning'; // Tipo de alerta
  @Output() alertClosed = new EventEmitter<void>(); // Evento para notificar al padre
  visible: boolean = false;
  ngOnInit(): void {
    this.showAlert();
  }
  showAlert() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
      this.alertClosed.emit();
    }, this.duration);
  }
  closeNotification() {
    this.visible = false;
}
}
