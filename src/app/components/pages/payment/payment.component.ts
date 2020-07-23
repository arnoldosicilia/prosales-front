import { Component, OnInit, Input } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { ClientService } from 'src/app/services/client.service';
import { SalesService } from 'src/app/services/sales.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

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

  @Input() amountValue: number;
  amountValueCopy: number;
  discountValue: number;
  @Input() basket: BasketProduct[];
  http: HttpClient;
  router: Router

  client: any;
  company: any;

  username: string;
  user: User;

  showClient: boolean;
  showCompany: boolean;

  @Input() tax: number;
  deposited: number;
  remaining: number;
  paymentMethod: any;

  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private salesService: SalesService,
    private companyService: CompanyService,


  ) { }

  ngOnInit(): void {
    this.amountValueCopy = this.amountValue;
    this.showClient = false;
    this.showCompany = false;
    this.deposited = 0;
    this.username = AuthUtils.getUsername();

    console.log(this.username)
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



}
