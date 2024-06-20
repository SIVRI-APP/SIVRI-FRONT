import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantesProyectoComponent } from './integrantes-proyecto.component';

describe('IntegrantesProyectoComponent', () => {
  let component: IntegrantesProyectoComponent;
  let fixture: ComponentFixture<IntegrantesProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrantesProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrantesProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
