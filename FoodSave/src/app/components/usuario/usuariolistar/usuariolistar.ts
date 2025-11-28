import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuarioservice } from '../../../services/usuarioservice';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuariolistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './usuariolistar.html',
  styleUrl: './usuariolistar.css',
})
export class Usuariolistar implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5', 'c6', 'c7','c8', 'c9'];

  constructor(private uS: Usuarioservice){}

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
