import { IProductBasket } from "../../types";
import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class ProductBasket extends Component<IProductBasket> {
  protected _items: HTMLElement;
  protected orderButton: HTMLButtonElement;
  protected _totalPrice: HTMLElement;
  protected events: IEvents;
  
  constructor(container: HTMLElement, selectors: Record<string, string>, events: IEvents) {
    super(container);
    this.events = events;
    const {orderButtonSelector, totalPriceSelector, basketItemsSelector} = selectors;
    this.orderButton = ensureElement<HTMLButtonElement>(orderButtonSelector, container);
    this.orderButton.addEventListener('click', () => {this.events.emit('basket: order')});
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
    this.toggleOrderButton(products);
  }

  set totalPrice(price: number) {
    this.setText(this._totalPrice, price + ' синапсов');
  }

  toggleOrderButton(products: HTMLElement[]) {
    if (products.length) {
        this.setDisabled(this.orderButton, false);
    } else {
        this.setDisabled(this.orderButton, true);
    }
  }
}