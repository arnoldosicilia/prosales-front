import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/ui/navbar/navbar.component'
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PosComponent } from './components/pages/pos/pos.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { SalesComponent } from './components/pages/sales/sales.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'pos',
        component: PosComponent
      },
      {
        path: 'pos/payment',
        component: PaymentComponent
      },
      {
        path: '**',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
