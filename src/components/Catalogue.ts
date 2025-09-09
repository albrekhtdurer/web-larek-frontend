import { IProduct } from '../types';
import { IEvents } from './base/events';
import {Model} from './base/model'

export class Catalogue extends Model {
  protected products: IProduct[];
  protected selectedProduct: IProduct;

  constructor(events: IEvents, products: IProduct[]) {
    super(events);
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getSelectedProduct(): IProduct {
    return this.selectedProduct;
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.emitChanges('catalogue: changed');
  }

  setProducts(products: IProduct[]) {
    this.products = products;
    this.emitChanges('catalogue: changed');
  }
}