import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,RouterLinkActive
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  protected mostrarSemilleroMentor:boolean=false;
  protected mostrarSemilleroFuncionario:boolean=false;
  protected mostrarCrearSemilleroDirector:boolean=false;
  protected mostrarSemilleroDirector:boolean=false;
  protected mostrarIntegrantesSemilleroFuncionario:boolean=false;

  protected found:boolean=false;
  private roles: string[]=[];
  constructor(
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
    this.roles=informacionUsuarioAutenticadoService.retornarRoles();
    this.mostrarSemilleroMentor=this.roles.includes('SEMILLERO:MENTOR');
    this.mostrarSemilleroFuncionario = this.roles.includes('FUNCIONARIO:SEMILLEROS');
    this.mostrarCrearSemilleroDirector = this.roles.includes('GRUPO:DIRECTOR');
    this.mostrarSemilleroDirector = this.roles.includes('GRUPO:DIRECTOR');
    this.mostrarIntegrantesSemilleroFuncionario = this.roles.includes('FUNCIONARIO:SEMILLEROS');
  }
  ngOnInit(): void {

  }

}
