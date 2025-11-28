import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Calificacionreceta } from '../../../models/calificacionreceta';
import { Calificacionrecetaservice } from '../../../services/calificacionrecetaservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recetaservice } from '../../../services/recetaservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Receta } from '../../../models/receta';
import { Usuario } from '../../../models/usuario';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-calificacionrecetainsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './calificacionrecetainsertar.html',
  styleUrl: './calificacionrecetainsertar.css',
})
export class Calificacionrecetainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  cal: Calificacionreceta = new Calificacionreceta();

  listaRecetas: Receta[] = [];
  listaUsuarios: Usuario[] = [];

  tipos: { value: number; viewValue: number }[] = [
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
  ];

  constructor(
    private cS: Calificacionrecetaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private rS: Recetaservice,
    private uS: Usuarioservice
  ) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.listaRecetas = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      calificacionC: ['', Validators.required],
      receta: ['', Validators.required],
      usuario: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.cal.idCalificacionReceta = this.form.value.id;
      this.cal.calificacion = this.form.value.calificacionC;
      this.cal.receta.idReceta = this.form.value.receta;
      this.cal.usuario.idUsuario = this.form.value.usuario;

      this.cS.insert(this.cal).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });

      this.router.navigate(['calificacion']);
    }
  }
}
