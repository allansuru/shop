import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(private orderService: OrderService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$
    .subscribe(user => this.userId = user.uid);
  }

  async placeOrder(f) {
    const order = new Order(this.userId, this.shipping, this.cart);
    console.log('Pedido: ', order);
    console.log('Remessa do Pedido:', this.shipping);
    const result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
