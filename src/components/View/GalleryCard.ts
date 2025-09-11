import { BaseCard } from "../common/BaseCard";
import { IProduct } from "../../types";
import { IEvents } from "../base/events";

export class GalleryCard extends BaseCard<IProduct> {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected categoryMappings: Record<string, string>;

  constructor(container: HTMLElement, events: IEvents, selectors: Record<string, string>, categoryMappings: Record<string, string>) {
    const {priceSelector, titleSelector, categorySelector, imageSelector, descriptionSelector, basketButtonSelector} = selectors;
    super(container, priceSelector, titleSelector, events);
    this._category = container.querySelector(categorySelector);
    this._image = container.querySelector(imageSelector);
    this.categoryMappings = categoryMappings;
    this.container.addEventListener('click', () => {this.events.emit('galleryCard: select', {id: this._id})});
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
}