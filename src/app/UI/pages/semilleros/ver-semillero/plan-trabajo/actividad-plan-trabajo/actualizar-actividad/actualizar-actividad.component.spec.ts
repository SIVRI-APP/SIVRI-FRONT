import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarActividadComponent } from './actualizar-actividad.component';

describe('ActualizarActividadComponent', () => {
  let component: ActualizarActividadComponent;
  let fixture: ComponentFixture<ActualizarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarActividadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
