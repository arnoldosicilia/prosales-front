import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

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

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.urlBasic.concat('users'), this.httpOptions);
    }

    getUser(id: number): Observable<User> {
        const url = `${this.urlBasic}user${'/'}${id}`;
        console.log(url);
        return this.http.get<User>(url, this.httpOptions);
    }

    getUserByUsername(username: string): Observable<User> {
        const url = `${this.urlBasic}username${'/'}${username}`;
        console.log(url);
        return this.http.get<User>(url, this.httpOptions);
    }



    // tslint:disable-next-line: typedef
    createUser(user: User) {
        const url = `${this.urlBasic}`;
        console.log(url);
        return this.http.post<User>(url.concat('user'), user, this.httpOptions)
            .subscribe(data => this.router.navigate(['users']), err => console.log(err));
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