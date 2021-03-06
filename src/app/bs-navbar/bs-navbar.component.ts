import { ShoppingCart } from 'shared/models/shopping-cart';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor
  (
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

   ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.getCart();
  }

  async getCart() {
    this.cart$ = await this.shoppingCartService.getCart();

  }
  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
