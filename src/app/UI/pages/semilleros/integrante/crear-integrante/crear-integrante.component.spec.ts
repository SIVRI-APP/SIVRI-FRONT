import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIntegranteComponent } from './crear-integrante.component';

describe('CrearIntegranteComponent', () => {
  let component: CrearIntegranteComponent;
  let fixture: ComponentFixture<CrearIntegranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearIntegranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearIntegranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
