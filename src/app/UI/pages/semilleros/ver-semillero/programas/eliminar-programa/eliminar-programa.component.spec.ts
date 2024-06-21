import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarProgramaComponent } from './eliminar-programa.component';

describe('EliminarProgramaComponent', () => {
  let component: EliminarProgramaComponent;
  let fixture: ComponentFixture<EliminarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
