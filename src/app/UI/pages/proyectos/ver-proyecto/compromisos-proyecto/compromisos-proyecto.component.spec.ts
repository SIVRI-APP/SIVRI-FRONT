import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromisosProyectoComponent } from './compromisos-proyecto.component';

describe('CompromisosProyectoComponent', () => {
  let component: CompromisosProyectoComponent;
  let fixture: ComponentFixture<CompromisosProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompromisosProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompromisosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
