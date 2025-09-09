import { BaseCard } from "./common/BaseCard";
import { IProduct } from "../types";
import { IEvents } from "./base/events";

export class GalleryCard extends BaseCard<IProduct> {
  _category: HTMLElement;
  _image: HTMLImageElement;
  categoryMappings: Record<string, string>;

  //TODO: проверить, что можно не дублировать унаследованные проперти
  constructor(container: HTMLElement, priceSelector: string, titleSelector: string, events: IEvents, categorySelector: string, imageSelector: string, categoryMappings: Record<string, string>) {
    super(container, priceSelector, titleSelector, events);
    this._category = container.querySelector(categorySelector);
    this._image = container.querySelector(imageSelector);
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
}