import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudUsuariosComponent } from './listar-solicitud-usuarios.component';

describe('ListarUsuariosComponent', () => {
  let component: ListarSolicitudUsuariosComponent;
  let fixture: ComponentFixture<ListarSolicitudUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSolicitudUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSolicitudUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
