import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.getQuantity();
  }

  getAllProducts() {
    this.productService.getAll()
      .subscribe(product => {
        this.filterProducts = this.products = product;
        this.getParamsStart();
      });
  }


  filterProductsByCategory(category: string) {
    this.filterProducts = (category) ?
      this.products.filter(f => f.category.toLowerCase().includes(category.toLowerCase())) :
      this.products;
  }

  getParamsStart() {
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filterProductsByCategory(this.category);
    });
  }

  async getQuantity() {
  this.cart$ = (await this.shoppingCartService.getCart());
  }

}
