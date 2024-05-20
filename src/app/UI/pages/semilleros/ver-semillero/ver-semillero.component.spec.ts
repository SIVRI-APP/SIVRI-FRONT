import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSemilleroComponent } from './ver-semillero.component';

describe('VerSemilleroComponent', () => {
  let component: VerSemilleroComponent;
  let fixture: ComponentFixture<VerSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
