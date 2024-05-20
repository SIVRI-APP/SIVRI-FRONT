import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVerUsuarioComponent } from './index-ver-usuario.component';

describe('IndexVerUsuarioComponent', () => {
  let component: IndexVerUsuarioComponent;
  let fixture: ComponentFixture<IndexVerUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexVerUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexVerUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
