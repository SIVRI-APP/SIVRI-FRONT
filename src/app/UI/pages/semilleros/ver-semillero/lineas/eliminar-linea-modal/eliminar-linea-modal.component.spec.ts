import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarLineaModalComponent } from './eliminar-linea-modal.component';

describe('EliminarLineaModalComponent', () => {
  let component: EliminarLineaModalComponent;
  let fixture: ComponentFixture<EliminarLineaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarLineaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarLineaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
