import { Component } from '@angular/core';
import { Iaservice } from '../../services/iaservice';
import { FormsModule } from '@angular/forms';
import { Menu } from '../menu/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ia',
  imports: [CommonModule, FormsModule],
  templateUrl: './ia.html',
  styleUrl: './ia.css',
})
export class Ia {
  ingrediente: string = '';
  respuesta: string = '';

  constructor(private deepseekService: Iaservice) {}

  buscar(): void {
    if (!this.ingrediente.trim()) {
      this.respuesta = 'Por favor ingresa un ingrediente.';
      return;
    }

    this.respuesta = 'Cargando...';

    this.deepseekService.generarRespuesta(
      `Dame una receta usando ${this.ingrediente}`
    )
    .subscribe({
      next: (data: any) => {
        this.respuesta = data.choices[0].message.content;
      },
      error: (err: any) => {
        this.respuesta = 'Error al conectar con DeepSeek.';
        console.error(err);
      }
    });
  }
}
