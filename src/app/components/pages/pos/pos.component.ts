import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { Client } from 'src/app/models/client.model';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/product.model';
import { BasketProduct } from 'src/app/models/basketProduct.model';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  searchInput: string = "Serach by EAN or Name "

  clients: Client[];
  products: Product[];
  search: [];
  productSearchInput: string = '';
  clientSearchInput: string = '';
  client: { commercialName: 'Cliente Contado', fiscalName: 'Cliente Contado', nif: 'A00000000', defaultPayMethod: 'Efectivo' };
  basket: BasketProduct[] = [];
  total: number = 0;
  productQty: number = 0;
  totalTax: number = 0;
  showPayment: boolean = false;
  showProducts: boolean = false;
  showClients: boolean = false;


  constructor(
    private productService: ProductService,
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.productService.getProducts().subscribe(data => this.products = data);
    this.clientService.getClients().subscribe(data => this.clients = data);
  }

  addToBasket(product: Product) {

    let basketCopy = [...this.basket];

    let basketProduct: BasketProduct = {
      id: product.id,
      name: product.name,
      stock: product.stock,
      qty: 1,
      subTotal: parseFloat(product.pvp.toFixed(2)),
      tax: product.tax,
      total: parseFloat(product.pvp.toFixed(2))
    }

    if (basketCopy.some(elm => elm.id === product.id)) {
      this.addQtyBasket(basketProduct);
      return;
    }

    basketCopy.push(basketProduct);
    this.basket = [...basketCopy];
    this.calculateTotal();
  }

  addQtyBasket(basketProduct: BasketProduct) {
    let basketCopy = [...this.basket];
    basketCopy.some(elem => elem.id === basketProduct.id && (elem.qty += 1, elem.total += elem.subTotal));
    this.calculateTotal();
  }

  subtractQtyBasket(product: BasketProduct) {
    let basketCopy = [...this.basket]
    basketCopy.some(elem => elem.id === product.id && (elem.qty -= 1, elem.total -= elem.subTotal));
    this.calculateTotal();
  }

  deleteProductBasket = product => {
    let basketCopy = [...this.basket]
    basketCopy.splice(basketCopy.indexOf(product), 1);
    this.basket = basketCopy;
    this.calculateTotal();
  }

  calculateTotal = () => {
    let basketCopy = [...this.basket];
    this.total = parseFloat(basketCopy.reduce((acum, elem) => acum + elem.total, 0).toFixed(2));
    this.productQty = basketCopy.reduce((acum, elem) => acum + elem.qty, 0);
    this.totalTax = parseFloat(basketCopy.reduce((acum, elem) => acum + (elem.total - (elem.total / (elem.tax / 100 + 1))), 0).toFixed(2));
    this.basket = basketCopy;
  }

  openPaymentModal() {
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {
        amountValue: this.total,
        basket: this.basket,
        tax: this.totalTax,
      },
      height: '300px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });

  }




}
