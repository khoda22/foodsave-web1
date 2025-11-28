import { Component, OnInit } from '@angular/core';
import { Notificacionservice } from '../../../services/notificacionservice';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inventarioservice } from '../../../services/inventarioservice';
import { MatOptionModule } from '@angular/material/core';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-notificacioninsertar',
  imports: [MatButtonModule, DatePipe, CommonModule, FormsModule, MatOptionModule, MatSelectModule],
  templateUrl: './notificacioninsertar.html',
  styleUrl: './notificacioninsertar.css',
  providers: [
    DatePipe
  ],
})
export class Notificacioninsertar implements OnInit {
  inventarios: any[] = [];   // Listado para el select
  idInventario: number = 0;
  notificaciones: any[] = [];

  constructor(
    private nS: Notificacionservice,
    private inventarioService: Inventarioservice,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarInventarios();
  }

  listarInventarios() {
    this.inventarioService.list().subscribe(data => {
      this.inventarios = data;
    });
  }

  generarNotificacion() {
    console.log("ID INVENTARIO ENVIADO:", this.idInventario);

    if (!this.idInventario) {
      alert("Seleccione un inventario");
      return;
    }

    this.nS.autogenerar(this.idInventario)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          alert("Notificaciones generadas correctamente");
          this.listarNotificaciones();
        },
        error: (err) => console.error("ERROR:", err)
      });
  }

  listarNotificaciones() {
    this.nS.listar().subscribe(data => {
      this.notificaciones = data;
    });
  }
}
