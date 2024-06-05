import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInterroganteComponent } from './modal-interrogante.component';

describe('ModalInterroganteComponent', () => {
  let component: ModalInterroganteComponent;
  let fixture: ComponentFixture<ModalInterroganteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInterroganteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInterroganteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
