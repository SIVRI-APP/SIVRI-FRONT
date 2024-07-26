import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDocumentosMentorComponent } from './listar-documentos-mentor.component';

describe('ListarDocumentosMentorComponent', () => {
  let component: ListarDocumentosMentorComponent;
  let fixture: ComponentFixture<ListarDocumentosMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarDocumentosMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarDocumentosMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
