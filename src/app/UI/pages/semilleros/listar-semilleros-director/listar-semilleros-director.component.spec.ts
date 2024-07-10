import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSemillerosDirectorComponent } from './listar-semilleros-director.component';

describe('ListarSemillerosComponent', () => {
  let component: ListarSemillerosDirectorComponent;
  let fixture: ComponentFixture<ListarSemillerosDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarSemillerosDirectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSemillerosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
