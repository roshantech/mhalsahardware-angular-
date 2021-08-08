import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {  BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,private router: Router) { }

  login(data:any){
    return this.http.post<any>(`http://localhost:3000/auth/login`,data ).pipe(tap(res => {
      console.log(res);
      if(res.message === 'jwt expired'){
        this.logout();
      }
      const user = new User(res.email,res.id,res.accessToken,res.refreshToken ,res.maxAge);
      console.log(user);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }))
  }

  autoLogin(){
    const userData:{ email:string,
       id:string,
       _token:string,
       _refreshToken:string,
       _tokenExpired:string} = JSON.parse(localStorage.getItem('userData'));
     if(!userData){
      return;
     }
     const loadedUser = new User(userData.email,userData.id,userData._token,userData._refreshToken,new Date(userData._tokenExpired) );
     if(loadedUser.token){
       this.user.next(loadedUser);
     }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
  }

}
