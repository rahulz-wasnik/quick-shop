import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, from, mergeMap } from 'rxjs';
import { Auth } from 'aws-amplify';

export const appHttpInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return getToken().pipe(
    mergeMap((token) => {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next(request);
    })
  );
};

export function getToken(): Observable<unknown> {
  return from(
    new Promise((resolve, reject) => {
      Auth.currentSession()
        .then((session) => {
          if (session.isValid()) {
            resolve(session.getIdToken().getJwtToken());
          } else {
            console.error('Session invalidated');
            resolve(null);
          }
        })
        .catch((err) => reject(err));
    })
  );
}
