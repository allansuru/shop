import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

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
  this.subscription = (await this.shoppingCartService.getCart())
   .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
