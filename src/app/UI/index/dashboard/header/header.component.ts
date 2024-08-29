import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  protected nombre: string = '';

  protected title: string = 'Sistema de Información Vicerrectoría de Investigaciones - SIVRI';
  protected isMobile: boolean = false;
  protected notifications = false;

  constructor(
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
    // Aqui Yurani puede acceder a los roles
    this.nombre = informacionUsuarioAutenticadoService.retornarNombre();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.detectarMobile();
  }

  detectarMobile() {
    this.title = 'SIVRI'
    this.isMobile = window.innerWidth <= 780;
  }
}
