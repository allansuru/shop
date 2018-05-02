import { async } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
     return this.db.list('/shopping-carts').push({
        dateCrated: new Date().getTime()
      });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
 }

 private async updateItemQuantity(product: Product, change: number) {
  const cartId = await this.getOrCreateCartId();
  const item$ = this.getItem(cartId, product.$key);

  item$.take(1).subscribe(item => {
    item$.update({ product: product, quantity: (item.quantity || 0) + change});
  });
 }
}



// Pra que usar If/Else?
/**      if (item.$exists()) {
        item$.update({
          quantity: item.quantity + 1
        });
      } else {
        item$.set({
          product: product,
          quantity: 1
        });
      } */