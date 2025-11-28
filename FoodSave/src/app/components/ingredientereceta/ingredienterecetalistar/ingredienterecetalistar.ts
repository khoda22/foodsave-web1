import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Ingredientereceta } from '../../../models/ingredientereceta';
import { Ingredienterecetaservice } from '../../../services/ingredienterecetaservice';

@Component({
  selector: 'app-ingredienterecetalistar',
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './ingredienterecetalistar.html',
  styleUrl: './ingredienterecetalistar.css',
})
export class Ingredienterecetalistar implements OnInit {
  dataSource: MatTableDataSource<Ingredientereceta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private irS: Ingredienterecetaservice){}

  ngOnInit(): void {
    this.irS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    //insertar
    this.irS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.irS.delete(id).subscribe((data) => {
      this.irS.list().subscribe((data) => {
        this.irS.setList(data);
      });
    });
  }
}
