import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const canActivateAdmin = async () => {
  const router = inject(Router);
  const service = inject(AuthService);
  const user = await service.getUser();
  console.log('ini user', user);
  if (user) {
    return true;
  } else {
    return router.navigateByUrl('/login');
  }
};
