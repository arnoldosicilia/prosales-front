import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isLoading = true;
  isErrorLoading = false;
  pageTitle = 'Products';
  icon = 'store_mall_directory';
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'provRef', 'ean', 'pvd', 'pvp', 'stock'];
  dataSource: any = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.isErrorLoading = !(this.isLoading = true);
    this.productService.getProducts().subscribe(data => {

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
