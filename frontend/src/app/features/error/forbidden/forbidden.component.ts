import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss'
})
export class ForbiddenComponent {
  private router = inject(Router);
  private location = inject(Location);

  goHome(): void {
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back();
  }
}
