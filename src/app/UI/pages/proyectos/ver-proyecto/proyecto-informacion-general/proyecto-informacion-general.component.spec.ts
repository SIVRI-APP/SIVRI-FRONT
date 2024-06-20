import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoInformacionGeneralComponent } from './proyecto-informacion-general.component';

describe('ProyectoInformacionGeneralComponent', () => {
  let component: ProyectoInformacionGeneralComponent;
  let fixture: ComponentFixture<ProyectoInformacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoInformacionGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProyectoInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
