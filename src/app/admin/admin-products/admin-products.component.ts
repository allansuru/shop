
import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  lstProducts: Product[];
  lstFiltrado: any[] = [];
  subscription: Subscription;

  // DataTable
 // tableResourse: DataTableResource<Product>;
  items: Product[];
  itemCount: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterBySuru(query: string) {
    this.lstFiltrado = (query) ?
    this.lstProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.lstProducts;
  }

  getProducts() {
     this.subscription = this.productService.getAll().subscribe(products => {
        this.lstProducts = products;
        this.lstFiltrado = products;
        console.log('Produtos: ', this.lstProducts);

      //  this.initializeTable(products);
      });
  }

  // private initializeTable(products: Product[]) {
  //   this.tableResourse = new DataTableResource(products);
  //   this.tableResourse.query({ offset: 0 })
  //    .then(items => this.items = items);
  //   this.tableResourse.count()
  //    .then(count => this.itemCount);
  // }

  // reloadItems(params) {
  //   // tslint:disable-next-line:curly
  //   if (!this.tableResourse) return;
  //   this.tableResourse.query(params)
  //    .then(items => this.items = items);
  // }
}
