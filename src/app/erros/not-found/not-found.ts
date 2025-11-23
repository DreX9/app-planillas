import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  router = inject(Router)
  volver() {
    // Aquí colocas la ruta a donde deseas volver
    this.router.navigate(['/']); // EJEMPLO: volver al inicio
  }
}
