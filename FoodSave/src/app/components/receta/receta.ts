import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Recetalistar } from './recetalistar/recetalistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-receta',
  imports: [RouterModule, Recetalistar, Menu],
  templateUrl: './receta.html',
  styleUrl: './receta.css',
})
export class Receta {
  constructor(public route: ActivatedRoute){}
}
