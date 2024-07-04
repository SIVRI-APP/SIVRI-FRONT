import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSemilleroComponent } from './crear-semillero.component';

describe('CrearSemilleroComponent', () => {
  let component: CrearSemilleroComponent;
  let fixture: ComponentFixture<CrearSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
