import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVerProyectoComponent } from './index-ver-proyecto.component';

describe('IndexVerProyectoComponent', () => {
  let component: IndexVerProyectoComponent;
  let fixture: ComponentFixture<IndexVerProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVerProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexVerProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
