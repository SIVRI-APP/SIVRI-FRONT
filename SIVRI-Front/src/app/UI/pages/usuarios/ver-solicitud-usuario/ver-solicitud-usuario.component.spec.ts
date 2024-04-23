import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudUsuarioComponent } from './ver-solicitud-usuario.component';

describe('VerSolicitudUsuarioComponent', () => {
  let component: VerSolicitudUsuarioComponent;
  let fixture: ComponentFixture<VerSolicitudUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSolicitudUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerSolicitudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
