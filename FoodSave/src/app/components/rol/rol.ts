import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Rollistar } from './rollistar/rollistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-rol',
  imports: [RouterModule, Rollistar, Menu],
  templateUrl: './rol.html',
  styleUrl: './rol.css',
})
export class Rol {
  constructor(public route: ActivatedRoute){}
}
