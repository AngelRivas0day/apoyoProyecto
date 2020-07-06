import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>){
    const token = '1234';
    if(true){
      request = request.clone({
        setHeaders: {
          token
        }
      });
      return request;
    }
    return request;
  }
}
