import { BaseCard } from "../common/BaseCard";
import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class BasketCard extends BaseCard<IProduct> {
  protected _index: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, selectors: Record<string, string>) {
    const {indexSelector, deleteButtonSelector, priceSelector, titleSelector} = selectors;
    super(container, priceSelector, titleSelector, events);
    this._index = ensureElement<HTMLElement>(indexSelector, container);
    this.deleteButton = ensureElement<HTMLButtonElement>(deleteButtonSelector, container);
    this.deleteButton.addEventListener('click', () => {this.events.emit('basket: deleteCard', {id: this._id})});
  }

  set index(value: number) {
    this.setText(this._index, value);
  }
}
