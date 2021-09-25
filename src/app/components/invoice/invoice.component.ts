import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
  }

  now = new Date();
  data=this._Activatedroute.snapshot.paramMap.get("data");
  
  ngOnInit(){
  }
}
