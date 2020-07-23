import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PosComponent } from './components/pages/pos/pos.component';
import { HomeComponent } from './components/pages/home/home.component';

import { ProductService } from './services/product.service';
import { ClientService } from './services/client.service';
import { SalesService } from './services/sales.service';
import { CompanyService } from './services/company.service';


import { TableComponent } from './components/ui/table/table.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { ClientFormComponent } from './components/pages/clients/client-form/client-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    SalesComponent,
    ProductsComponent,
    DashboardComponent,
    PosComponent,
    HomeComponent,
    TableComponent,
    PaymentComponent,
    LoginComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    ClientService,
    SalesService,
    CompanyService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
