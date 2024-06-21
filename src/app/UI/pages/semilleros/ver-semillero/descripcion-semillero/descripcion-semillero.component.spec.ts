import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionSemilleroComponent } from './descripcion-semillero.component';

describe('DescripcionSemilleroComponent', () => {
  let component: DescripcionSemilleroComponent;
  let fixture: ComponentFixture<DescripcionSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescripcionSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
