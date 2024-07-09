import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodosSemillerosComponent } from './listar-todos-semilleros.component';

describe('ListarTodosSemillerosComponent', () => {
  let component: ListarTodosSemillerosComponent;
  let fixture: ComponentFixture<ListarTodosSemillerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTodosSemillerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarTodosSemillerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
