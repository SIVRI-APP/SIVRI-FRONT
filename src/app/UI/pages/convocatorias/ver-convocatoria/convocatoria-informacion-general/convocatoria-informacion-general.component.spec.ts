import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaInformacionGeneralComponent } from './convocatoria-informacion-general.component';

describe('ConvocatoriaInformacionGeneralComponent', () => {
  let component: ConvocatoriaInformacionGeneralComponent;
  let fixture: ComponentFixture<ConvocatoriaInformacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvocatoriaInformacionGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvocatoriaInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
