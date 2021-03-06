import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/client.model';
import { Router } from '@angular/router';

@Injectable()
export class ClientService {

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

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.urlBasic.concat('clients'), this.httpOptions);
    }

    getClient(id: number): Observable<Client> {
        const url = `${this.urlBasic}client${'/'}${id}`;
        console.log(url);
        return this.http.get<Client>(url, this.httpOptions);
    }

    // tslint:disable-next-line: typedef
    createClient(client: Client): Observable<Client> {
        const url = `${this.urlBasic}`;
        console.log(url);
        return this.http.post<Client>(url.concat('clients'), client, this.httpOptions);
    }

    updateClient(client: Client): Observable<Client> {
        const url = `${this.urlBasic}client${'/'}${client.id}`;
        console.log(url);
        return this.http.put<Client>(url, client, this.httpOptions);
    }

    deleteClient(id: number): void {
        const url = `${this.urlBasic}client${'/'}${id}`;
        console.log(url);
        this.http.delete(url, this.httpOptions);
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