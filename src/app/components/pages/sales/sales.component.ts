import { Component, OnInit, ViewChild } from '@angular/core';
import { Sale } from '../../../models/sales.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from '../../../services/sales.service';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  isLoading = true;
  isErrorLoading = false;
  pageTitle = 'Sales';
  icon = 'people_alt';
  sales: Sale[] = [];
  displayedColumns: string[] = ['id', 'author', 'client', 'paymentMethod', 'deposited', 'total', 'remaining', 'discount', 'tax'];
  dataSource: any = null;



  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private saleService: SalesService
  ) { }

  ngOnInit(): void {
    this.isErrorLoading = !(this.isLoading = true);
    this.saleService.getSales().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.isLoading = !(this.isErrorLoading = true);
      console.log(err);
    });
  }

}
