import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const LoginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router);
  if (token===null) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};