import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/items.service';
import {MatDialog} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute,
              private itemservice: ItemsService,
              public dialog: MatDialog,
              private router:Router) { }
  id=this._Activatedroute.snapshot.paramMap.get("id");
  
  item:any = [];
  
  openDialog(form:NgForm){
    const dialogRef = this.dialog.open(UpdateDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        console.log(form.value);
        this.itemservice.updateById(this.id,form.value).subscribe(res => {
          console.log(res);
          this.router.navigate(['']);
        });
      }
    });

  }

  ngOnInit(): void {
    this.itemservice.getById(this.id).subscribe(res => {
      console.log(res);
      this.item = res;
      console.log(this.item);
    });
  }

}



@Component({
  selector: 'update-dialog',
  templateUrl: './update-dialog.html',

})
export class UpdateDialog {}
