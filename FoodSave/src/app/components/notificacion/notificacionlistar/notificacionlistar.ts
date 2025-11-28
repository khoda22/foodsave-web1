import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Notificacion } from '../../../models/notificacion';
import { Notificacionservice } from '../../../services/notificacionservice';

@Component({
  selector: 'app-notificacionlistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './notificacionlistar.html',
  styleUrl: './notificacionlistar.css',
})
export class Notificacionlistar implements OnInit{
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private nS: Notificacionservice){}

  ngOnInit(): void {
    this.nS.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
}
