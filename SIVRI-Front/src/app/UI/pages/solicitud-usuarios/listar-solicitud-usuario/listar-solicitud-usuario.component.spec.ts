import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudUsuarioComponent } from './listar-solicitud-usuario.component';

describe('ListarSolicitudUsuarioComponent', () => {
  let component: ListarSolicitudUsuarioComponent;
  let fixture: ComponentFixture<ListarSolicitudUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSolicitudUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSolicitudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
