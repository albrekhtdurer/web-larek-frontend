import { IProductWStatus } from "../types";
import { BaseCard } from "./common/BaseCard";
import { IEvents } from "./base/events";


export class ModalCard extends BaseCard<IProductWStatus> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _description: HTMLElement;
  protected categoryMappings: Record<string, string>;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, selectors: Record<string, string>, categoryMappings: Record<string, string>) {
    const {priceSelector, titleSelector, categorySelector, imageSelector, descriptionSelector, basketButtonSelector} = selectors;
    super(container, priceSelector, titleSelector, events);
    this._category = container.querySelector(categorySelector);
    this._image = container.querySelector(imageSelector);
    this._description = container.querySelector(descriptionSelector);
    this.basketButton = container.querySelector(basketButtonSelector);
    this.basketButton.addEventListener('click', () => this.events.emit('galleryCard: addToBasket', {id: this._id}));
    this.categoryMappings = categoryMappings;
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent);
  }

  set category(value: string) {
    if (this.categoryMappings[value]) {
      const categoryClass = 'card__category_' + this.categoryMappings[value];
      this._category.classList.add(categoryClass);
    }
    this.setText(this._category, value);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set price(value: string) {
    const priceText = value  ? value + ' синапсов' : 'бесценно';
    this.setText(this._price, priceText);
  }

  set basketButtonStatus(value: string) {
    const disable = (value) === 'Недоступно' ? true : false;
    this.setDisabled(this.basketButton, disable);
    this.setText(this.basketButton, value);
  }
}
