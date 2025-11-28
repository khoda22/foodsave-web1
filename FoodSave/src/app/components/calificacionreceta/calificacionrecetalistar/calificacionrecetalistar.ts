import { Component, OnInit } from '@angular/core';
import { Calificacionreceta } from '../../../models/calificacionreceta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Calificacionrecetaservice } from '../../../services/calificacionrecetaservice';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calificacionrecetalistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './calificacionrecetalistar.html',
  styleUrl: './calificacionrecetalistar.css',
})
export class Calificacionrecetalistar implements OnInit {
  dataSource: MatTableDataSource<Calificacionreceta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  constructor(private crS: Calificacionrecetaservice) {}

  ngOnInit(): void {
    this.crS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    //insertar
    this.crS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
