import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/services/auth.service';
@Injectable()
export class SidInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService) {}

  intercept(
    request: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<string>> {
    const sid = this.auth.getSID();

    if (sid && request.url === environment.apiOrigin) {
      return next.handle(
        request.clone({
          setHeaders: { sid },
        })
      );
    }

    return next.handle(request);
  }
}
