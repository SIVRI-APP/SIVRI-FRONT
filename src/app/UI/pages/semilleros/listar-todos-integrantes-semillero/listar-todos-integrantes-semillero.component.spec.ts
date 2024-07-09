import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosIntegrantesSemilleroComponent } from './listar-todos-integrantes-semillero.component';

describe('ListarTodosIntegrantesSemilleroComponent', () => {
  let component: ListarTodosIntegrantesSemilleroComponent;
  let fixture: ComponentFixture<ListarTodosIntegrantesSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTodosIntegrantesSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTodosIntegrantesSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
