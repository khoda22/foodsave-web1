import { Component, OnInit } from '@angular/core';
import { Escaneo } from '../../../models/escaneo';
import { Escaneoservice } from '../../../services/escaneoservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-escaneolistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './escaneolistar.html',
  styleUrl: './escaneolistar.css',
})
export class Escaneolistar implements OnInit {
  dataSource: MatTableDataSource<Escaneo> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private eS: Escaneoservice){}

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.eS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }
  eliminar(id: number) {
    this.eS.delete(id).subscribe((data) => {
      this.eS.list().subscribe((data) => {
        this.eS.setList(data);
      });
    });
  }
}
