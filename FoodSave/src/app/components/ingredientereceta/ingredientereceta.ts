import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Ingredienterecetalistar } from './ingredienterecetalistar/ingredienterecetalistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-ingredientereceta',
  imports: [RouterModule, Ingredienterecetalistar, Menu],
  templateUrl: './ingredientereceta.html',
  styleUrl: './ingredientereceta.css',
})
export class Ingredientereceta {
  constructor(public route: ActivatedRoute){}
}
