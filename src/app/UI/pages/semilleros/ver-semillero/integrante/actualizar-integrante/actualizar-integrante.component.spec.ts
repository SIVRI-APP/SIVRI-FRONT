import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarIntegranteComponent } from './actualizar-integrante.component';

describe('ActualizarIntegranteComponent', () => {
  let component: ActualizarIntegranteComponent;
  let fixture: ComponentFixture<ActualizarIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarIntegranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
