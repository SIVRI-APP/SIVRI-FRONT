import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosProyectoComponent } from './documentos-proyecto.component';

describe('DocumentosProyectoComponent', () => {
  let component: DocumentosProyectoComponent;
  let fixture: ComponentFixture<DocumentosProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentosProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
