import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BearService } from './bear.service';


export interface User {
  name: string;
}

let DATA:any = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bearData:Observable<any>;

  myControl = new FormControl();
  options: any[] = [
   
  ];
  filteredOptions: Observable<User[]>;

  constructor(private bearService:BearService,public dialog: MatDialog){}

  ngOnInit() {

    this.bearService.getAllBears().subscribe(res => {
      console.log(res);
      DATA = res;
      this.options = res.map(res => {
        return { name:res.name}
      });
      console.log(this.options);

    })

    this.bearData = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._value(value))
      );


    
  }


  openDialog(data:any): void {
    const dialogRef = this.dialog.open(ItemInfoDialog, {
      width: '1080px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  private _value(value){
    const filterValue = value;

    return DATA.filter(data => data.name.includes(filterValue));
  }





}

@Component({
  selector: 'item-info-dialog',
  templateUrl: 'item-info-dialog.html',
  styleUrls: ['style.scss']

})
export class ItemInfoDialog {

  constructor(
    public dialogRef: MatDialogRef<ItemInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}