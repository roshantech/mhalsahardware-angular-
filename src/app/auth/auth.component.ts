import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }
  hide = true;

  onSubmit(authForm:NgForm){
    console.log(authForm.value);
    this.authService.login(authForm.value).subscribe(res => {
      this.router.navigate(['']);
      console.log(res);
    },err => console.log(err));
    authForm.reset(); 
  }

  ngOnInit(): void {
  }
}
