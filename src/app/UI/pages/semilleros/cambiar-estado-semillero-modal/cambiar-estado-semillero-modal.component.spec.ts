import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstadoSemilleroModalComponent } from './cambiar-estado-semillero-modal.component';

describe('CambiarEstadoSemilleroModalComponent', () => {
  let component: CambiarEstadoSemilleroModalComponent;
  let fixture: ComponentFixture<CambiarEstadoSemilleroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarEstadoSemilleroModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CambiarEstadoSemilleroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
