import { Component, OnInit, Input, Inject } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ClientService } from 'src/app/services/client.service';
import { SalesService } from 'src/app/services/sales.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BasketProduct } from 'src/app/models/basketProduct.model';
import { Client } from 'src/app/models/client.model';
import { Company } from 'src/app/models/company.model';
import { Sale } from 'src/app/models/sales.model';
import { User } from 'src/app/models/user.model';

import { AuthUtils } from 'src/app/utils/auth-utils';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amountValue: number;
  amountValueCopy: number;
  discountValue: number;
  basket: BasketProduct[];
  client: Client;
  company: any = { fiscalName: "Prueba", address: "Prueba Address", city: "City", province: "Province", zipCode: "zipCode", email: "Prueba@Prueba.com", telNumber: "922222222" }
  username: string;
  user: User;
  showClient: boolean;
  showCompany: boolean;
  tax: number;
  deposited: number;
  remaining: number;
  change: number;
  paymentMethod: any;
  disableComplete: boolean;

  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private salesService: SalesService,
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.amountValue = this.data.amountValue;
    this.amountValueCopy = this.data.amountValue;
    this.remaining = this.data.amountValue;
    this.basket = this.data.basket;
    this.tax = 0;
    this.discountValue = 0;
    this.showClient = false;
    this.showCompany = false;
    this.deposited = 0;
    this.username = AuthUtils.getUsername();
    this.disableComplete = true;
    this.client = this.data.client;
    this.getUser();

    console.log(this.client)

  }

  closeModal() {
    this.dialogRef.close();
  }

  getUser() {
    this.companyService.getUserByUsername(this.username).subscribe(data => {
      this.user = data
      this.getCompany();
    });
  }

  getCompany() {
    this.companyService.getCompany(this.user.comapanyId).subscribe(data => this.company = data);
  }

  addSale() {
    console.log(this.username)
    console.log(this.user)
    const productsIds = [];
    this.basket.map(x => productsIds.push(x.id))

    const newSale = {
      author: this.user.id,
      client: this.client.id,
      products: productsIds,
      deposited: this.deposited.toString(),
      total: this.amountValue.toString(),
      remaining: this.remaining.toString(),
      discount: this.discountValue.toString(),
      tax: this.tax.toString(),
    };

    console.log(newSale);
    this.salesService.createSale(newSale);
    newSale.products.map(elm => this.productService.removeStock(elm.id, elm.qty));
    this.closeModal();
  }

  getTab(event) {
    event.index === 0 ? this.paymentMethod = "cash" : this.paymentMethod = "card";

    console.log(this.client)
  }


  handleChange(e) {
    const { name, value } = e.target;

    if (name === 'amount') {
      this.amountValue = value;
    } else if (name === 'discount') {
      this.discountValue = parseFloat(value);
      this.amountValueCopy -= this.discountValue;
    } else if (name === 'deposited') {
      this.deposited = parseFloat(value);
      (this.amountValueCopy - this.deposited) > 0 ? this.remaining = (this.amountValueCopy - this.deposited) : this.remaining = 0;
      (this.amountValueCopy - this.deposited) > 0 ? this.change = 0 : this.change = -(this.amountValueCopy - this.deposited);
      this.remaining <= 0 ? this.disableComplete = false : this.disableComplete = true;
    }
  }







}

