import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Receta } from '../../../models/receta';
import { Recetaservice } from '../../../services/recetaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-recetainsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './recetainsertar.html',
  styleUrl: './recetainsertar.css',
})
export class Recetainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  rec: Receta = new Receta();

  id: number = 0;
  today = new Date();

  edicion: boolean = false;
  estado: boolean = true;

  tipos: { value: number; viewValue: number }[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
  ];

  constructor(
    private rS : Recetaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

    this.form = this.formBuilder.group({
      id: [''],
      tituloR: ['', Validators.required],
      instruccionesR: ['', Validators.required],
      dificultadR: ['', Validators.required],
      tiempoPreparacionR: ['', Validators.required],
      creadoPorR: ['', Validators.required],
    })

  }
  aceptar(): void {
    if (this.form.valid) {
      this.rec.idReceta = this.form.value.id;
      this.rec.titulo = this.form.value.tituloR;
      this.rec.instrucciones = this.form.value.instruccionesR;
      this.rec.dificultad = this.form.value.dificultadR;
      this.rec.tiempoPreparacion = this.form.value.tiempoPreparacionR;
      this.rec.creadoPor = this.form.value.creadoPorR;

      if (this.edicion) {
        this.rS.update(this.rec).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rec).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['receta']);
    }
  }
  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: new FormControl(data.idReceta),
          tituloR: new FormControl(data.titulo),
          instruccionesR: new FormControl(data.instrucciones),
          dificultadR: new FormControl(data.dificultad),
          tiempoPreparacionR: new FormControl(data.tiempoPreparacion),
          creadoPorR: new FormControl(data.creadoPor)
        });
      });
    }
  }
}
