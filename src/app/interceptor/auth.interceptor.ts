import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('authToken');
    // const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    // if (token) {
    //   console.log(JSON.parse(atob(token.split('.')[1])));
    // }


    console.log('🛡 Interceptor triggered for:', request.url);

    if (token) {
      console.log('Token found, attaching header');

      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('📦 Final Headers:', authRequest.headers);

      return next.handle(authRequest);
    }

    console.log('⚠️ No token found, sending request without Authorization header');

    return next.handle(request);
  }
}

