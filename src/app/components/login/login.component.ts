import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/securedUser.class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiURL } from '../../app.component';
import { AuthUtils } from '../../utils/auth-utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  rememberUser = false;
  background: string;
  loginForm: FormGroup;

  isLogin = false;

  private imgBackground: string[] = [
    'camion1.jpg',
    'camion2.jpg',
    'camion3.jpg'
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private errorPanel: MatSnackBar
  ) {
    this.background = this.getBackground();
  }

  ngOnInit(): void {
    if (AuthUtils.isLogged()) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  getBackground(): string {
    return 'assets/background-img/' +
      // tslint:disable-next-line: no-bitwise
      this.imgBackground[~~(Math.random() * this.imgBackground.length)];
  }

  login(): void {
    this.isLogin = true;
    let user: User = new User(this.loginForm.value);
    const header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(ApiURL + '/login', this.loginForm.value, { headers: header, observe: 'response' }).subscribe((result) => {
      let user: User = new User(result.body);
      user.password = this.loginForm.value.password;
      AuthUtils.loggin(user, this.router);
    }, (error) => {
      this.loginError();
    });
  }

  loginError(): void {
    this.isLogin = false;
    this.errorPanel.open('User or password entered is not correct', 'ERROR', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['error']
    });
  }
}
