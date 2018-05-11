import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem } ) {

        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:curly
        // tslint:disable-next-line:forin
        for (const productId in itemsMap) {
            const item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({
                ...item,
                $key: productId
            }));
        }
    }

    get totalItemsCount() {
       let count = 0;
      // tslint:disable-next-line:forin
      for (const productId in this.items) {
         count += this.items[productId].quantity;
      }
      return count;
    }

    get totalPrices() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (const productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
      }

    getQuantity(product: Product) {
      const item = this.itemsMap[product.$key];
      return item ? item.quantity : 0;
      }
    }

