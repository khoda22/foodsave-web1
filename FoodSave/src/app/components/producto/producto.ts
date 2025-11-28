import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Productolistar } from './productolistar/productolistar';
import { Menu } from '../menu/menu';


@Component({
  selector: 'app-producto',
  imports: [RouterModule, Productolistar, Menu],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {
  constructor(public route: ActivatedRoute){}
}
