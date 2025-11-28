import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  encapsulation: ViewEncapsulation.None,
})
export class Landing implements OnInit {
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % 3;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + 3) % 3;
  }
}
