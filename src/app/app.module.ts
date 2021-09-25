import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialsModule } from './materials/materials.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeleteDialog, ItemMasterComponent } from './components/masters/item-master/item-master.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ItemsService } from './items.service';
import { UpdateComponent, UpdateDialog } from './components/operations/update/update.component';
import { FormsModule } from '@angular/forms';
import { AddDialog, AddItemComponent } from './components/operations/add-item/add-item.component';
import { AuthComponent } from './auth/auth.component';
import { CheckoutDialog, BillingComponent } from './components/billing/billing.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './components/invoice/invoice.component';
import {NgxPrintModule} from 'ngx-print';
import { DashboardComponent, ItemInfoDialog } from './components/dashboard/dashboard.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { MasterContactComponent } from './components/masters/master-contact/master-contact.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ItemMasterComponent,
    UpdateComponent,
    UpdateDialog,
    DeleteDialog,
    AddItemComponent,
    AddDialog,
    AuthComponent,
    BillingComponent,
    CheckoutDialog,
    InvoiceComponent,
    DashboardComponent,
    ContactusComponent,
    MasterContactComponent,
    ItemInfoDialog
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [ItemsService,{provide: HTTP_INTERCEPTORS , useClass: AuthInterceptorService,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
