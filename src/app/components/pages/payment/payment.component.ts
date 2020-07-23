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
  client: any;
  company: any;
  username: string;
  user: User;
  showClient: boolean;
  showCompany: boolean;
  tax: number;
  deposited: number;
  remaining: number;
  change: number;
  paymentMethod: any;

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
    this.basket = this.data.basket;
    this.tax = this.data.tax;
    this.showClient = false;
    this.showCompany = false;
    this.deposited = 0;
    this.username = AuthUtils.getUsername();
    this.remaining = 0;
  }

  closeModal() {
    console.log(this.data)
    console.log(this.amountValue)
    this.dialogRef.close();
  }

  getData = (companyId, clientId) => {
    this.companyService.getCompany(companyId).subscribe(data => this.company = data);
    this.clientService.getClient(clientId).subscribe(data => this.client = data);
    this.companyService.getUserByUsername(this.username).subscribe(data => this.user = data);
  }

  addSale = () => {

    const newSale: Sale = {
      author: this.client.id,
      client: this.client.id,
      products: this.basket,
      paymentMethod: this.paymentMethod,
      deposited: this.deposited,
      total: this.amountValue,
      remaining: this.remaining,
      discount: this.discountValue,
      tax: this.tax
    };

    this.salesService.createSale(newSale);
    newSale.products.map(elm => this.productService.removeStock(elm.id, elm.qty));
  }

  getTab(event) {
    event.index === 0 ? this.paymentMethod = "cash" : this.paymentMethod = "card";
    console.log("se llama al tab con ----", event);
    console.log(this.paymentMethod)
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
      (this.amountValueCopy - this.deposited) < 0 ? this.remaining = (this.amountValueCopy - this.deposited) : this.remaining = 0;
      (this.amountValueCopy - this.deposited) < 0 ? this.change = 0 : this.change = -(this.amountValueCopy - this.deposited);
    }
  }



}


