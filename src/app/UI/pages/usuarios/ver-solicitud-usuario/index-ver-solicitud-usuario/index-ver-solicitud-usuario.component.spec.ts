import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVerSolicitudUsuarioComponent } from './index-ver-solicitud-usuario.component';

describe('IndexVerSolicitudUsuarioComponent', () => {
  let component: IndexVerSolicitudUsuarioComponent;
  let fixture: ComponentFixture<IndexVerSolicitudUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVerSolicitudUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexVerSolicitudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
