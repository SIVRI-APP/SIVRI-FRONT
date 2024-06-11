import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlanTrabajoComponent } from './listar-plan-trabajo.component';

describe('ListarPlanTrabajoComponent', () => {
  let component: ListarPlanTrabajoComponent;
  let fixture: ComponentFixture<ListarPlanTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPlanTrabajoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
