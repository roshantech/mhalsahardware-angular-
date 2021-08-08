import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  intercept( req:HttpRequest<any> , next:HttpHandler ) {
    return this.auth.user.pipe(take(1), exhaustMap(user => {
      
      if(!user){
        return next.handle(req);
      }
      const modifiedRequest = req.clone({headers: new HttpHeaders().set('authorization', 'Bearer '+user._token)});
      return next.handle(modifiedRequest);
    }))
  } 
  constructor(private auth: AuthService) { }
}
