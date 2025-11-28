import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rollistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './rollistar.html',
  styleUrl: './rollistar.css',
})
export class Rollistar implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private roS: Rolservice){}

  ngOnInit(): void {
    this.roS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.roS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.roS.delete(id).subscribe((data) => {
      this.roS.list().subscribe((data) => {
        this.roS.setList(data);
      });
    });
  }
}
