import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSinRolComponent } from './usuario-sin-rol.component';

describe('UsuarioSinRolComponent', () => {
  let component: UsuarioSinRolComponent;
  let fixture: ComponentFixture<UsuarioSinRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioSinRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioSinRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
