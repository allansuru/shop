import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('actions') actions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
   }
}
