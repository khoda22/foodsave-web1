import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-rolinsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatNativeDateModule],
  templateUrl: './rolinsertar.html',
  styleUrl: './rolinsertar.css',
})
export class Rolinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  
  id: number = 0;
  today = new Date();

  edicion: boolean = false;
  estado: boolean = true;

  constructor(
    private rS: Rolservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required]
    });
  }
  aceptar (): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.id;
      this.rol.nombreRol = this.form.value.nombre;

      if (this.edicion) {
        this.rS.update(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.rol).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['rol']);
    }
  }
  init (){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: new FormControl(data.idRol),
          nombre: new FormControl(data.nombreRol)
        });
      });
    }
  }
}
