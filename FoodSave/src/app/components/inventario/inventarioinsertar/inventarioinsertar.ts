import { Component, OnInit } from '@angular/core';
import { Inventarioservice } from '../../../services/inventarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { Producto } from '../../../models/producto';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Productoservice } from '../../../services/productoservice';
import { MatInputModule } from '@angular/material/input';
import { Inventario } from '../../../models/inventario';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-inventarioinsertar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './inventarioinsertar.html',
  styleUrl: './inventarioinsertar.css',
  providers: [provideNativeDateAdapter()],
})
export class Inventarioinsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  inv: Inventario = new Inventario();
  listaUsuarios: Usuario[] = [];
  listaProductos: Producto[] = [];

  id: number = 0;
  today = new Date(); 

  edicion: boolean = false;
  estado: boolean = true; 

  constructor(
    private iS: Inventarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: Usuarioservice,
    private pS: Productoservice
  ) {}

  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
    this.pS.list().subscribe(data=>{
      this.listaProductos = data
    })

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });


    // FORM
    this.form = this.formBuilder.group({
      id: [''], // <-- no se llena, es solo para mostrar en edit
      cantidad: ['', [Validators.required, Validators.min(1)]],
      diasduracion: ['', [Validators.required, Validators.min(0)]],
      estado: ['', [Validators.required]],
      fechavencimiento: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      producto: ['', [Validators.required]]
    });
  }
  aceptar(): void {
    if (this.form.valid) {

      this.inv.idInventario = this.form.value.id;
      this.inv.cantidadInventario = this.form.value.cantidad;
      this.inv.diasduracionInventario = this.form.value.diasduracion;
      this.inv.estadoInventario = this.form.value.estado;
      this.inv.fechavencimientoInventario = this.form.value.fechavencimiento;
      this.inv.usuario.idUsuario = this.form.value.usuario;
      this.inv.producto.idProducto = this.form.value.producto;
      
      if (this.edicion) {
        this.iS.update(this.inv).subscribe(() => {
          this.iS.list().subscribe((data) => {
            this.iS.setList(data);
          });
        });
      } else {
        // INSERT
        this.iS.insert(this.inv).subscribe((data) => {
          this.iS.list().subscribe(data => {
            this.iS.setList(data)
          })
        })
      }
      
      this.router.navigate(['inventario']);
    }
  }

  init() {
    if (this.edicion) {
      this.iS.listId(this.id).subscribe((data) => {     
        this.form = new FormGroup({
          id: new FormControl(data.idInventario),
          cantidad: new FormControl(data.cantidadInventario),
          diasduracion: new FormControl(data.diasduracionInventario),
          estado: new FormControl(data.estadoInventario),
          fechavencimiento: new FormControl(data.fechavencimientoInventario),
          usuario: new FormControl(data.usuario.idUsuario),
          producto: new FormControl(data.producto.idProducto),
        });
      });
    }
  }
  
}
