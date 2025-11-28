import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Producto } from '../../../models/producto';
import { Productoservice } from '../../../services/productoservice';

@Component({
  selector: 'app-productolistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './productolistar.html',
  styleUrl: './productolistar.css',
})
export class Productolistar implements OnInit {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c4', 'c6', 'c7','c8'];

  constructor(private pS: Productoservice){}

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
