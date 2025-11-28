import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Ingredientereceta } from '../../../models/ingredientereceta';
import { Receta } from '../../../models/receta';
import { Producto } from '../../../models/producto';
import { Ingredienterecetaservice } from '../../../services/ingredienterecetaservice';
import { Router } from '@angular/router';
import { Recetaservice } from '../../../services/recetaservice';
import { Productoservice } from '../../../services/productoservice';

@Component({
  selector: 'app-ingredienterecetainsertar',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './ingredienterecetainsertar.html',
  styleUrl: './ingredienterecetainsertar.css',
})
export class Ingredienterecetainsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  ingr: Ingredientereceta= new Ingredientereceta();

  listaRecetas: Receta[] = [];
  listaProductos: Producto[] = [];

  tiposU: { value: string; viewValue: string }[] = [
    { value: 'kg', viewValue: 'kg' },
    { value: 'g', viewValue: 'g' },
    { value: 'lt', viewValue: 'lt' },
    { value: 'ml', viewValue: 'ml' },
    { value: 'unidad', viewValue: 'unidad' },
  ];

  tiposN: { value: string; viewValue: string }[] = [
    { value: 'Picado', viewValue: 'Picado' },
    { value: 'Rallado', viewValue: 'Rallado' },
    { value: 'Pelado', viewValue: 'Pelado' },
    { value: 'Cocido', viewValue: 'Cocido' },
    { value: 'Crudo', viewValue: 'Crudo' },
    { value: 'Machacado', viewValue: 'Machacado' },
  ];

  constructor(
    private iS: Ingredienterecetaservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private rS: Recetaservice,
    private pS: Productoservice
  ) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.listaRecetas = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaProductos = data;
    });

    this.form = this.formBuilder.group({
      id: [''],
      cantidad: ['', Validators.required],
      unidadI: ['', Validators.required],
      notaI: ['', Validators.required],
      receta: ['', Validators.required],
      producto: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.ingr.idIngredienteReceta = this.form.value.id;
      this.ingr.cantidadProductos = this.form.value.cantidad;
      this.ingr.unidad = this.form.value.unidadI;
      this.ingr.nota = this.form.value.notaI;
      this.ingr.receta.idReceta = this.form.value.receta;
      this.ingr.producto.idProducto = this.form.value.producto;

      this.iS.insert(this.ingr).subscribe((data) => {
        this.iS.list().subscribe((data) => {
          this.iS.setList(data);
        });
      });

      this.router.navigate(['ingrediente']);
    }
  }
}
