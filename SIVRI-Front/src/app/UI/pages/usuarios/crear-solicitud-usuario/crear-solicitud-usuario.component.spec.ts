import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSolicitudUsuarioComponent } from './crear-solicitud-usuario.component';

describe('CrearSolicitudUsuarioComponent', () => {
  let component: CrearSolicitudUsuarioComponent;
  let fixture: ComponentFixture<CrearSolicitudUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSolicitudUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSolicitudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
