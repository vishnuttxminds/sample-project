import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(HttpClientService);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
