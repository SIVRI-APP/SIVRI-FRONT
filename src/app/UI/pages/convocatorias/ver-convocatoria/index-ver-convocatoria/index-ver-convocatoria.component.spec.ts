import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVerConvocatoriaComponent } from './index-ver-convocatoria.component';

describe('IndexVerConvocatoriaComponent', () => {
  let component: IndexVerConvocatoriaComponent;
  let fixture: ComponentFixture<IndexVerConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVerConvocatoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexVerConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
