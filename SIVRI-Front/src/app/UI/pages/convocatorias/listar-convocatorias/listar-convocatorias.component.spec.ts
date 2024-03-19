import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConvocatoriasComponent } from './listar-convocatorias.component';

describe('ListarConvocatoriasComponent', () => {
  let component: ListarConvocatoriasComponent;
  let fixture: ComponentFixture<ListarConvocatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarConvocatoriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarConvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
