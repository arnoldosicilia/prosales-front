import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Company } from '../models/company.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable()
export class CompanyService {

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

    getCompanys(): Observable<Company[]> {
        return this.http.get<Company[]>(this.urlBasic.concat('companies'), this.httpOptions);
    }

    getCompany(id: number) {
        const url = `${this.urlBasic}company${'/'}${id}`;
        console.log(url);
        return this.http.get(url, this.httpOptions);
    }

    // tslint:disable-next-line: typedef
    createCompany(company: Company) {
        const url = `${this.urlBasic}`;
        console.log(url);
        return this.http.post<Company>(url.concat('company'), company, this.httpOptions)
            .subscribe(data => this.router.navigate(['companies']), err => console.log(err));
    }

    // tslint:disable-next-line: typedef
    private extractData(response: Response) {
        const body: any = response.json ? response.json() : response;
        return body.data ? body.data : (body || {});
    }


    getUserByUsername(username: string): Observable<User> {
        console.log("se llama al get user by username")
        const url = `${this.urlBasic}username${'/'}${username}`;
        console.log(url);
        return this.http.get<User>(url, this.httpOptions);
    }

    /*     private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    } */
}
