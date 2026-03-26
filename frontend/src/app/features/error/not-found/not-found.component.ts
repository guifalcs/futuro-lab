import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  private router = inject(Router);
  private location = inject(Location);

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back();
  }
}
