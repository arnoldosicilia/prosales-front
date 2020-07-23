import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientFormComponent } from './client-form/client-form.component';

import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthUtils } from 'src/app/utils/auth-utils';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  isLoading = true;
  isErrorLoading = false;
  pageTitle = 'Clients';
  icon = 'people_alt';
  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'nif', 'email', 'commercialName', 'fiscalName', 'city', 'province', 'country', 'web', 'telNumber', 'credit'];
  dataSource: any = null;
  isAdmin: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isAdmin = AuthUtils.isAdmin();
    this.isErrorLoading = !(this.isLoading = true);
    this.clientService.getClients().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;

    }, err => {
      this.isLoading = !(this.isErrorLoading = true);
      console.log(err);
    });
  }
  openCrateToggle() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      data: {},
      height: '470px',
      width: '800px',
    });
  }
}
