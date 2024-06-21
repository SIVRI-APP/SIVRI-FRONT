import { Component, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Respuesta } from '../../../../../../service/common/model/respuesta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-programa',
  standalone: true,
  imports: [],
  templateUrl: './crear-programa.component.html',
  styleUrl: './crear-programa.component.css'
})
export class CrearProgramaComponent implements OnInit {
  protected idSemillero!: string;
  // Inyeccion de Modal
  private modalService = inject(NgbModal);
  //formulario reactivo
  protected formulario: FormGroup;
  // Respuesta del Back
  protected respuesta: Respuesta<boolean>;
  @Output() mostrarCreaPrograma: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ){
      this.mostrarCreaPrograma=true;
      this.respuesta = new Respuesta<false>();
    this.formulario = this.formBuilder.group({
     // idSemillero: [''],
      ///nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],

    });
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idSemillero = params['id'];

    })
    console.log('id semillero dedde crear programa--'+this.idSemillero)
  }

}
