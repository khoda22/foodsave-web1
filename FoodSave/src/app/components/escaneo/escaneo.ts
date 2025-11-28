import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Escaneolistar } from './escaneolistar/escaneolistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-escaneo',
  imports: [RouterModule, Escaneolistar, Menu],
  templateUrl: './escaneo.html',
  styleUrl: './escaneo.css',
})
export class Escaneo {
  constructor(public route: ActivatedRoute){}
}
