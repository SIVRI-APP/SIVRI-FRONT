import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionAdvertenciaComponent } from './notificacion-advertencia.component';

describe('NotificacionAdvertenciaComponent', () => {
  let component: NotificacionAdvertenciaComponent;
  let fixture: ComponentFixture<NotificacionAdvertenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionAdvertenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificacionAdvertenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
