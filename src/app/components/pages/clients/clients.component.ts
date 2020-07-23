import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../../services/client.service';


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
  displayedColumns: string[] = ['id', 'nif', 'email', 'defaultPayMethod', 'commercialName', 'fiscalName', 'city', 'province', 'country', 'web', 'telNumber', 'credit'];
  dataSource: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.isErrorLoading = !(this.isLoading = true);
    this.clientService.getClients().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;

    }, err => {
      this.isLoading = !(this.isErrorLoading = true);
      console.log(err);
    });
  }

}
