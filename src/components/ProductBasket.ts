import { IProductBasket } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IEvents } from "./base/events";

export class ProductBasket extends Component<IProductBasket> {
  _items: HTMLElement;
  orderButton: HTMLButtonElement;
  _totalPrice: HTMLElement;
  protected events: IEvents;
  
  constructor(container: HTMLElement, selectors: Record<string, string>, events: IEvents) {
    super(container);
    const {orderButtonSelector, totalPriceSelector, basketItemsSelector} = selectors;
    this.orderButton = ensureElement<HTMLButtonElement>(orderButtonSelector, container);
    this._totalPrice = ensureElement<HTMLElement>(totalPriceSelector, container);
    this._items = ensureElement<HTMLElement>(basketItemsSelector, container);
    this.items = [];
  }

  set items(products: HTMLElement[]) {
    if (products.length) {
        this._items.replaceChildren(...products);
    } else {
        this._items.replaceChildren(createElement<HTMLParagraphElement>('p', {
            textContent: 'Корзина пуста'
        }));
    }
  }

  set totalPrice(price: number) {
    this.setText(this._totalPrice, price + ' синапсов');
  }

  toggleOrderButton(products: string[]) {
    if (products.length) {
        this.setDisabled(this.orderButton, false);
    } else {
        this.setDisabled(this.orderButton, true);
    }
  }
}
