import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuariolistar } from './usuariolistar/usuariolistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-usuario',
  imports: [RouterModule, Usuariolistar, Menu],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route: ActivatedRoute){}
}
