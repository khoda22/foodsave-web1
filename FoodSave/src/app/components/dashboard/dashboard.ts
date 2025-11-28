import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Inventario } from "../inventario/inventario";
import { Menu } from '../menu/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, Menu, MatIconModule, MatCardModule, ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
