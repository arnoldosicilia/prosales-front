import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Sale } from '../models/sales.model';
import { Router } from '@angular/router';

@Injectable()
export class SalesService {

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

    getSales(): Observable<Sale[]> {
        return this.http.get<Sale[]>(this.urlBasic.concat('sales'), this.httpOptions);
    }

    getSale(id: number): Observable<Sale> {
        const url = `${this.urlBasic}sale${'/'}${id}`;
        console.log(url);
        return this.http.get<Sale>(url, this.httpOptions);
    }

    // tslint:disable-next-line: typedef
    createSale(sale) {
        const url = `${this.urlBasic}sales`;
        console.log(url);
        return this.http.post<Sale>(url, sale, this.httpOptions)
            .subscribe(data => this.router.navigate(['sales']), err => console.log(err));
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