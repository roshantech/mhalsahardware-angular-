import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { fromEvent, interval ,Observable,Subject,Subscription} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemsService } from 'src/app/items.service';

export interface Item {
  id: string;
  Description: string;
  AU: string;
  Quantity: number;
  Amount: number;
  SPrice: number;
}

let ELEMENT_DATA:any = [

];
let Added_data:Item[]= [

];
@Component({
  selector: 'app-dashboard',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private itemService: ItemsService,private router: Router, public dialog: MatDialog){}
  displayedColumns: string[] = ['Description', 'Quantity', 'SPrice'];
  myControl = new FormControl();
  options: any = [];
  filteredOptions: Observable<string[]>;
  Item:Observable<any>;
  dataSource:any =[];

  delItem(id){
    this.dataSource = this.dataSource.filter(item => item.id !==id);
  }

  addCheckout(form : NgForm){
    console.log(form.value);
    this.dataSource.push(form.value);
    console.log(Added_data);
  }
  ngOnInit() {
    this.Item = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this._value(value)
          console.log(value)
      }));
      setInterval(() => {
        this.itemService.getAllItems().subscribe(res => {
          ELEMENT_DATA = res;
          this.options = res.map(value => value.Description);

          })
      },5000)



    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _value(value){
    const filterValue = value;
    return ELEMENT_DATA.filter(data => data.Description.includes(filterValue));
  }

  findElementQuantityId(id){
    const filterValue = id;
    return ELEMENT_DATA.filter(data => data.id.includes(filterValue));
  };


  openDialog(){
    const dialogRef = this.dialog.open(CheckoutDialog);
    const navigationextras:NavigationExtras = this.dataSource;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.dataSource.forEach(item => {
          const Quantity = this.findElementQuantityId(item.id);
          const body = Quantity[0].Quantity - item.Quantity;
          console.log(body,Quantity,Quantity[0].Quantity,item.Quantity);
          this.itemService.updateById(item.id,{Quantity:body}).subscribe(res => {
            console.log(res);
          });
        });
        this.router.navigate(['/invoice'],navigationextras);


      }
    });

  }

}




@Component({
  selector: 'checkout-dialog',
  templateUrl: './checkout-dialog.html',

})
export class CheckoutDialog {}
