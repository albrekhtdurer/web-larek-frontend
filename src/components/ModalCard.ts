import { IProduct } from "../types";
import { BaseCard } from "./common/BaseCard";
import { IEvents } from "./base/events";


export class ModalCard extends BaseCard<IProduct> {
  _category: HTMLElement;
  _image: HTMLImageElement;
  _description: HTMLElement;
  categoryMappings: Record<string, string>;
  basketButton: HTMLButtonElement;

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

  setBasketButtonText(value: string) {
    this.setText(this.basketButton, value);
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
    if (!value) {
      this.setDisabled(this.basketButton, true);
      this.setBasketButtonText('Недоступно');
    }
  }
}
