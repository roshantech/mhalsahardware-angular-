import { AfterViewInit, Component,OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/items.service';


export interface PeriodicElement {
  Description:any, 
  AU:any, 
  Quantity:any,
  Amount:any,
  PPrice:any,
  SPrice:any

}

let ELEMENT_DATA: any = [

  

];

@Component({
  selector: 'app-home',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements  OnInit{

 
  constructor(private itemservice: ItemsService,
                public dialog: MatDialog,
                private router:Router){}

  displayedColumns: string[] = ['no','Description', 'AU', 'Quantity', 'Amount','PPrice','SPrice','update','delete'];
  dataSource:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  

  ngOnInit() {
    this.itemservice.getAllItems().subscribe(res => {
      console.log(res)
      console.log(ELEMENT_DATA);
      
      ELEMENT_DATA = res;
      console.log(ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

    })
  }

  openDialog(id: any){
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        console.log(id);
        this.itemservice.deleteById(id).subscribe(res => {
          console.log(res);
          this.router.navigate(['itemMaster']);
        });
      }
    });

  }

}



@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.html',

})
export class DeleteDialog {}
