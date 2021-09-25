import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BillingComponent } from './components/billing/billing.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { AddItemComponent } from './components/operations/add-item/add-item.component';
import { UpdateComponent } from './components/operations/update/update.component';
import { ItemMasterComponent } from './components/masters/item-master/item-master.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterContactComponent } from './components/masters/master-contact/master-contact.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [
  {
    path: 'itemMaster',
    component: ItemMasterComponent,
    children: [
    ]
  },
  {
    path: 'itemMaster/update/:id',
    component: UpdateComponent,
  },
  {
    path: 'itemMaster/additem',
    component: AddItemComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
    children: [
    ]
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data:{}
  },

  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'mastercontact',
    component: MasterContactComponent,
  },
  {
    path: 'contactus',
    component: ContactusComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
