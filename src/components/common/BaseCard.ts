import { Component } from "../base/component";
import { BaseCardData } from "../../types";
import { IEvents } from "../base/events";

export class BaseCard<T> extends Component<BaseCardData> {
  _price: HTMLElement;
  _title: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, priceSelector: string, titleSelector: string, events: IEvents) {
    super(container);
    this.events = events;
    this._title = container.querySelector(titleSelector);
    this._price = container.querySelector(priceSelector);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: string) {
    this.setText(this._price, value);
  }
}