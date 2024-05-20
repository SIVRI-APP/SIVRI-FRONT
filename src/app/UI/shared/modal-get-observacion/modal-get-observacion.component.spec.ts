import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGetObservacionComponent } from './modal-get-observacion.component';

describe('ModalGetInfoComponent', () => {
  let component: ModalGetObservacionComponent;
  let fixture: ComponentFixture<ModalGetObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGetObservacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalGetObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
