import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(err => {
      if (err) {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              const modelStateErrors = [];
              for (const key in err.error.errors) {
                if (err.error.errors[key]) {
                  modelStateErrors.push(err.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            }
            else {
              toast.error(err.error);
            }
            break;
          case 401:
            toast.error("Unauthorized");
            break;
          case 404:
            toast.error("Not found");
            router.navigateByUrl('/not-found');
            break;
          case 500:
            toast.error("Server error");
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
            router.navigateByUrl('/server-error');
            break;
          default:
            toast.error("Something unexpected went wrong");
            break;
        }
      }
      throw err;
    })
  )
};
