import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSemillerosComponent } from './listar-semilleros.component';

describe('ListarSemillerosComponent', () => {
  let component: ListarSemillerosComponent;
  let fixture: ComponentFixture<ListarSemillerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSemillerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarSemillerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
