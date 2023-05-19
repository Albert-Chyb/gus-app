import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** 
 * A guard that gives access to a route if the user is logged in.
 * 
 * @param redirectRoute - The route to redirect to if the user is not logged in.
 * @returns True if the user is logged in, false otherwise.
 */
export const AuthGuard =
  (redirectRoute?: string[]): CanActivateFn =>
  (route, state) => {
    const auth: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (auth.isLoggedIn()) {
      return true;
    }

    if(redirectRoute) {
      router.navigate(redirectRoute);
    }

    return false;
  };
