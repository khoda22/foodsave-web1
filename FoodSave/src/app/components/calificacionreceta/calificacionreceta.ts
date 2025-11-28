import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Calificacionrecetalistar } from './calificacionrecetalistar/calificacionrecetalistar';
import { Menu } from '../menu/menu';
import { Recetalistar } from "../receta/recetalistar/recetalistar";

@Component({
  selector: 'app-calificacionreceta',
  imports: [RouterModule, Calificacionrecetalistar, Menu],
  templateUrl: './calificacionreceta.html',
  styleUrl: './calificacionreceta.css',
})
export class Calificacionreceta {
  constructor(public route: ActivatedRoute){}
}
