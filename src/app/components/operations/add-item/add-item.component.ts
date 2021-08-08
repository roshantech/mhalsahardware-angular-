import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(
    private itemservice: ItemsService,
    public dialog: MatDialog,
    private router:Router) { }


openDialog(form:NgForm){
const dialogRef = this.dialog.open(AddDialog);

dialogRef.afterClosed().subscribe(result => {
if (result == true) {
console.log(form.value);
this.itemservice.addItem(form.value).subscribe(res => {
console.log(res);
this.router.navigate(['']);
});
}
});

}

ngOnInit(): void {
}


}



@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.html',

})
export class AddDialog {}
