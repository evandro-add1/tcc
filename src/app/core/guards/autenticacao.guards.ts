import { inject } from '@angular/core';

import {CanActivateFn, Router} from '@angular/router';

import { AuthService } from '../service/auth.service';

/**
 * Protege páginas que precisam de autenticação.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se estiver logado,permite acessar a página.
  if (authService.estaLogado()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
