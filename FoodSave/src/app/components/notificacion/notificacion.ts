import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Notificacionlistar } from './notificacionlistar/notificacionlistar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-notificacion',
  imports: [RouterModule, Notificacionlistar, Menu],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css',
})
export class Notificacion {
  constructor(public route: ActivatedRoute){}
}
