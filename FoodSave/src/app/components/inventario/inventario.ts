import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { inventariolistar } from './inventariolistar/inventariolistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-inventario',
  imports: [RouterOutlet, inventariolistar, Menu],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario {
  constructor(public route: ActivatedRoute){}
}
