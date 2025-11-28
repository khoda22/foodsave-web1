import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterModule } from '@angular/router';
import { Inventarioservice } from '../../../services/inventarioservice';
import { Inventario } from '../../../models/inventario';

@Component({
  selector: 'app-inventariolistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './inventariolistar.html',
  styleUrl: './inventariolistar.css',
})
export class inventariolistar implements OnInit{
  dataSource: MatTableDataSource<Inventario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private iS: Inventarioservice) {}

  ngOnInit(): void {
    this.iS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.iS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.iS.delete(id).subscribe((data) => {
      this.iS.list().subscribe((data) => {
        this.iS.setList(data);
      });
    });
  }
}
