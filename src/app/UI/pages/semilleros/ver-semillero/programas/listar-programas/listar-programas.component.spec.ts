import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProgramasComponent } from './listar-programas.component';

describe('ListarProgramasComponent', () => {
  let component: ListarProgramasComponent;
  let fixture: ComponentFixture<ListarProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProgramasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
