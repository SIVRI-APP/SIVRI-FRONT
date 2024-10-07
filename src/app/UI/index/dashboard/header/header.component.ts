import { Component, HostListener, type OnInit } from '@angular/core';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';
import { EnumTranslationService } from '../../../../service/common/enum-translation.service';
import { TipoUsuario } from '../../../../service/solicitudUsuarios/domain/model/enum/tipoUsuario';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  protected readonly FULL_TITLE = 'Sistema de Información Vicerrectoría de Investigaciones - SIVRI';
  protected readonly SHORT_TITLE = 'SIVRI';
  protected title = this.FULL_TITLE;
  protected isMobile = false;
  protected notifications = true;
  protected nombre = '';
  protected tipoUsuario = '';
  protected tipoUsuarioEnum = TipoUsuario;
  
  constructor(
    private readonly informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService,
    protected enumTranslationService: EnumTranslationService
  ) {}

  ngOnInit() {
    this.nombre = this.informacionUsuarioAutenticadoService.retornarNombre();
    this.tipoUsuario = this.informacionUsuarioAutenticadoService.retornarTipoUsuario();
    this.detectarMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.detectarMobile();
  }

  private detectarMobile() {
    this.isMobile = window.innerWidth <= 780;
    this.title = this.isMobile ? this.SHORT_TITLE : this.FULL_TITLE;
  }
}
