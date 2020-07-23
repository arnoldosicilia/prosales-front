import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { ProductsComponent } from '../components/pages/products/products.component';

@Injectable()
export class ProductService {

    private urlBasic = 'http://localhost:8080/';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('admin:admin')
        })
    };

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.urlBasic.concat('products'), this.httpOptions);
    }

    getProduct(id: number) {
        const url = `${this.urlBasic}product${'/'}${id}`;
        console.log(url);
        return this.http.get(url, this.httpOptions);
    }

    // tslint:disable-next-line: typedef
    createProduct(product: Product) {
        const url = `${this.urlBasic}`;
        console.log(url);
        return this.http.post<Product>(url.concat('product'), product, this.httpOptions)
            .subscribe(data => this.router.navigate(['products']), err => console.log(err));
    }

    removeStock(productId: number, removedQty: number) {
        const url = `${this.urlBasic}product${'/'}${productId}${'/'}${removedQty}`;
        this.http.patch<Product>(url, this.httpOptions);
    }


    // tslint:disable-next-line: typedef
    private extractData(response: Response) {
        const body: any = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
    }

    /*     private handleError(error: Response): Observable<any> {
            // in a real world app, we may send the server to some remote logging infrastructure
            // instead of just logging it to the console
            console.error(error);
            return Observable.throw(error.json() || 'Server error');
        } */
}
