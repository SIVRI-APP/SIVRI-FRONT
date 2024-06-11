import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIntegrantesComponent } from './listar-integrantes.component';

describe('ListarIntegrantesComponent', () => {
  let component: ListarIntegrantesComponent;
  let fixture: ComponentFixture<ListarIntegrantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarIntegrantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarIntegrantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
