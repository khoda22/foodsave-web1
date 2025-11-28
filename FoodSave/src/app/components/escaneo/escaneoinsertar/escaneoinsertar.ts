import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Escaneo } from '../../../models/escaneo';
import { Usuario } from '../../../models/usuario';
import { Escaneoservice } from '../../../services/escaneoservice';
import { Router } from '@angular/router';
import { Productoservice } from '../../../services/productoservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Producto } from '../../../models/producto';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-escaneoinsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './escaneoinsertar.html',
  styleUrl: './escaneoinsertar.css',
  providers: [provideNativeDateAdapter()]
})
export class Escaneoinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  esc: Escaneo = new Escaneo();

  today = new Date();

  listaUsuarios: Usuario[] = [];
  listaProductos: Producto[] = [];

  tipos: { value: string; viewValue: string }[] = [
    { value: 'QR Code', viewValue: 'QR Code' },
    { value: 'Codabar', viewValue: 'Codabar' },
  ];

  constructor(
    private eS: Escaneoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private pS: Productoservice,
    private uS: Usuarioservice
  ){}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.listaProductos = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      fecha: ['', Validators.required],
      origenE: ['', Validators.required],
      usuario: ['', Validators.required],
      producto: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.esc.idEscaneo = this.form.value.id;
      this.esc.fechaEscaneo = this.form.value.fecha;
      this.esc.origen = this.form.value.origenE;
      this.esc.usuario.idUsuario = this.form.value.usuario;
      this.esc.producto.idProducto = this.form.value.producto;

      this.eS.insert(this.esc).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });

      this.router.navigate(['escaneo']);
    }
  }
}
