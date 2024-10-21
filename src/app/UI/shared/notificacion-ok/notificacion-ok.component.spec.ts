import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionOkComponent } from './notificacion-ok.component';

describe('NotificacionOkComponent', () => {
  let component: NotificacionOkComponent;
  let fixture: ComponentFixture<NotificacionOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionOkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificacionOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
