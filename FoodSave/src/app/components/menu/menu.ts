import { Component } from '@angular/core';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  role: string = '';
  usuario: string = '';

  constructor(private loginService: Loginservice) {}

  cerrar() {
    sessionStorage.clear();
  }
  
 
  verificar() {
    this.role = this.loginService.showRole();

    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isClient() {
    return this.role === 'CLIENTE';
  }

}
