import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarLineaComponent } from './actualizar-linea.component';

describe('ActualizarLineaComponent', () => {
  let component: ActualizarLineaComponent;
  let fixture: ComponentFixture<ActualizarLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarLineaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
