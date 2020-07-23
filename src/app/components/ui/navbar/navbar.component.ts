import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthUtils } from 'src/app/utils/auth-utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'Home',
      route: 'main',
      icon: 'home'
    },
    {
      name: 'Clients',
      route: 'clients',
      icon: 'people_alt'
    },
    {
      name: 'Sales',
      route: 'sales',
      icon: 'receipt'
    },
    {
      name: 'Products',
      route: 'products',
      icon: 'store_mall_directory'
    },
    {
      name: 'Dashboard',
      route: 'dashboard',
      icon: 'leaderboard'
    },
    {
      name: 'Point of Sale',
      route: 'pos',
      icon: 'point_of_sale'
    }
  ];

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  shouldRun = true;

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    AuthUtils.logout(this.router);
  }


}