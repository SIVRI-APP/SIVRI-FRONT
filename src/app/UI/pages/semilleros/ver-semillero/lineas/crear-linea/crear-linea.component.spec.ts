import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLineaComponent } from './crear-linea.component';

describe('CrearLineaModalComponent', () => {
  let component: CrearLineaComponent;
  let fixture: ComponentFixture<CrearLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
