import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BasketItem } from './../../../../shared/classes/BasketItem';
import { Basket } from 'src/app/shared/classes/Basket';
import { Product } from 'src/app/shared/classes/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {

  basket: Basket = new Basket();
  @Input() basketItems: BasketItem[];
  subs: Subscription[] = [];
  totalItems: number;
  grandTotal: number;
  hasItems: boolean;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    //this.getBasket();
  }

  getBasket() {
    this.subs.push(this.cartService.getProducts()
    .subscribe(basket => {
      if(basket != null) {
        this.basket = basket; console.log(this.basket);
        if(this.basket.basketItems) {
          this.totalItems = 0;
          this.grandTotal = 0;
          this.basket.basketItems.forEach(item => {
            this.totalItems += item.quantity;
            this.grandTotal += (item.price)*(item.quantity);
          });
          this.hasItems = true;
        }
      } else {
        this.totalItems = 0;
      }
    }));
  }

  increaseQuantity(item: BasketItem) {
    console.log("itemmmmmm++++",item);
    if( item.quantity < parseInt(item.product.productStock)){

      this.cartService.addQty(item.product);
    }else{

      alert("Max limit exceeded");
    }
  }
  reduceQuantity(item: BasketItem) {
    if(item.quantity>1) {
      this.cartService.removeQty(item.product);
    }
    return;
  }

  removeItem(item: BasketItem) {
    this.cartService.removeCartItem(item);
  }
  ngOnDestroy(): void {
      this.subs.forEach(sub => {
        sub.unsubscribe();
      })
  }
}
