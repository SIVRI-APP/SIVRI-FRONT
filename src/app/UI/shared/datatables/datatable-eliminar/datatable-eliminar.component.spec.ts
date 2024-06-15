import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableEliminarComponent } from './datatable-eliminar.component';

describe('DatatableEliminarComponent', () => {
  let component: DatatableEliminarComponent;
  let fixture: ComponentFixture<DatatableEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableEliminarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatatableEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
