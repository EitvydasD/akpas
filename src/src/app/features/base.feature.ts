import { inject } from '@angular/core';
import { Router } from '@angular/router';

export abstract class BaseFeature {
  protected router = inject(Router);

  protected navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  protected navigateToAuth(): void {
    this.router.navigate(['/auth/login']);
  }
}
