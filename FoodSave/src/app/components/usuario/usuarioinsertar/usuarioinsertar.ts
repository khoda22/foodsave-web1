import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioRegistro } from '../../../models/usuarioRegistro';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuarioinsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './usuarioinsertar.html',
  styleUrl: './usuarioinsertar.css',
})
export class Usuarioinsertar {
  form: FormGroup = new FormGroup({});
  dto: UsuarioRegistro = new UsuarioRegistro();

  constructor(
    private uS: Usuarioservice, 
    private router: Router, 
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      foto: [''],
      ubicacion: ['', Validators.required],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.dto.username = this.form.value.username;
      this.dto.password = this.form.value.password;
      this.dto.email = this.form.value.email;
      this.dto.foto = this.form.value.foto;
      this.dto.ubicacion = this.form.value.ubicacion;

      this.uS.insert(this.dto).subscribe(() => {
        this.router.navigate(['usuario']);
      });
    }
  }
}
