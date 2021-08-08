import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  opened = false;

  constructor(private authService: AuthService){}

  ngOnInit() {

    this.authService.autoLogin();

    this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    }
    );
  }

  open(value:boolean){
    this.opened = value;
  }
}
