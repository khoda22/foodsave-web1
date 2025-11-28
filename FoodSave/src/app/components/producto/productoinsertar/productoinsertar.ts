import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Producto } from '../../../models/producto';
import { Productoservice } from '../../../services/productoservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-productoinsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './productoinsertar.html',
  styleUrl: './productoinsertar.css',
  providers: [provideNativeDateAdapter()],
})
export class Productoinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  prod: Producto = new Producto();

  id: number = 0;
  today = new Date();

  edicion: boolean = false;
  estado: boolean = true;

  tipos: { value: string; viewValue: string }[] = [
    { value: 'Verdura', viewValue: 'Verdura' },
    { value: 'Fruta', viewValue: 'Fruta' },
    { value: 'Carne', viewValue: 'Carne' },
    { value: 'Ave', viewValue: 'Ave' },
    { value: 'Pescado', viewValue: 'Pescado' },
    { value: 'Marisco', viewValue: 'Marisco' },
    { value: 'Semilla', viewValue: 'Semilla' },
    { value: 'Lácteo', viewValue: 'Lácteo' },
    { value: 'Bebida', viewValue: 'Bebida' },
  ];

  tipos2: { value: string; viewValue: string }[] = [
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'Agotado', viewValue: 'Agotado' },
    { value: 'Reservado', viewValue: 'Reservado' },
  ];

  constructor(
    private pS: Productoservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      nombreP: ['', Validators.required],
      categoriaP: ['', Validators.required],
      vidaUtilP: ['', Validators.required],
      estadoP: ['', Validators.required],
      codigoBarrasP: ['', Validators.required],
      pesoUnitarioP: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.prod.idProducto = this.form.value.id;
      this.prod.nombre = this.form.value.nombreP;
      this.prod.categoria = this.form.value.categoriaP;
      this.prod.vidaUtilDias = this.form.value.vidaUtilP;
      this.prod.estado = this.form.value.estadoP;
      this.prod.codigoBarras = this.form.value.codigoBarrasP;
      this.prod.pesoUnitario = this.form.value.pesoUnitarioP;

      if (this.edicion) {
        this.pS.update(this.prod).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.prod).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }

      this.router.navigate(['producto']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          id: new FormControl(data.idProducto),
          nombreP: new FormControl(data.nombre),
          categoriaP: new FormControl(data.categoria),
          vidaUtilP: new FormControl(data.vidaUtilDias),
          estadoP: new FormControl(data.estado),
          codigoBarrasP: new FormControl(data.codigoBarras),
          pesoUnitarioP: new FormControl(data.pesoUnitario),
        });
      });
    }
  }
}
