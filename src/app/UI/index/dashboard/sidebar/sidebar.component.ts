import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InformacionUsuarioAutenticadoService } from '../../../../service/auth/domain/service/informacionUsuarioAutenticado.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  protected found:boolean=false;
  roles: string[] = []
  constructor(
    protected informacionUsuarioAutenticadoService: InformacionUsuarioAutenticadoService
  ) {
    // Aqui Yurani puede acceder a los roles
    this.roles=informacionUsuarioAutenticadoService.retornarRoles();
    console.log(this.roles);
  }
  ngOnInit(){
    this.showSemillero();

  }
  showSemillero():boolean{
    for(const rol of this.roles ){
      if(rol === 'SEMILLERO:MENTOR' || rol === 'FUNCIONARIO:SEMILLEROS' || rol === 'GRUPO:DIRECTOR'){
        return this.found=true;
      }
    }
    return this.found=false;

  }
}
