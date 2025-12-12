import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientService } from '../service/http-client.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: HttpClientService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();

    console.log('Token in Interceptor:', token);

    if (token) {
      const cloned = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      console.log('Cloned Request with Token:', cloned);  
      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
