import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Model } from "../base/model";

export class Basket extends Model {
  protected products: IProduct[];
  
  constructor(events: IEvents) {
    super(events);
    this.products = [];
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getTotalPrice(): number {
    return this.products.map(product => product.price).reduce((sum, price) => sum + price, 0);
  }

  getTotal(): number {
    return this.products.length ?? 0;
  }

  hasProduct(id: string): boolean {
    return Boolean(this.products.find(product => product.id === id));
  }

  toggleProductInBasket(product: IProduct): void {
    if (this.hasProduct(product.id)) {
      const productIndex = this.products.findIndex(basketProduct => product.id === basketProduct.id);
      this.products.splice(productIndex, 1);
    } else {
      this.products.push(product);
    }
    this.emitChanges('basket: changed');
  }

  clearBasket(): void {
    this.products = [];
    this.emitChanges('basket: changed');
  }
}