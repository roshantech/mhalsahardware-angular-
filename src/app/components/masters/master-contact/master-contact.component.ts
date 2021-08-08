import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-contact',
  templateUrl: './master-contact.component.html',
  styleUrls: ['./master-contact.component.scss']
})
export class MasterContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  now = new Date();
}
