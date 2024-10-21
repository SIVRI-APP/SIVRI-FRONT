import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notificacion-ok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion-ok.component.html',
  styleUrl: './notificacion-ok.component.css'
})
export class NotificacionOkComponent {
  @Input() title: string = ''; // Título de la alerta
  @Input() message: string = '';
  @Input() duration: number = 5000; // Tiempo por defecto en milisegundos (5 segundos)
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
}
