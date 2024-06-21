import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVerSemilleroComponent } from './index-ver-semillero.component';

describe('IndexVerSemilleroComponent', () => {
  let component: IndexVerSemilleroComponent;
  let fixture: ComponentFixture<IndexVerSemilleroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVerSemilleroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexVerSemilleroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
