import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  @Output() newItemEvent = new EventEmitter<boolean>();
  isAuthenticated = false;
  
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(){
     this.authService.user.subscribe(user => {
      this.isAuthenticated = !user? false : true;
    });
    
  }
  opened = false; 
  openSidenav() {
    this.opened = !this.opened;
    this.newItemEvent.emit( this.opened);
  }
  logout(){
      this.authService.logout();
      
  }

  ngOnDestroy(){
    
  }


}
