import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  lstProducts: any[] = [];
  lstFiltrado: any[] = [];
  subscription: Subscription;

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
    this.lstProducts.filter(p => p['title'].toLowerCase().includes(query.toLowerCase())) :
    this.lstProducts;
  }

  getProducts() {
     this.subscription = this.productService.getAll().subscribe(itens => {
        this.lstProducts = itens;
        this.lstFiltrado = itens;
        console.log('Produtos: ', this.lstProducts);
      });
  }
}
