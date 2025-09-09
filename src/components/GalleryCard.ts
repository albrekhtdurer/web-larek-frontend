import { BaseCard } from "./common/BaseCard";
import { GalleryCardData } from "../types";
import { IEvents } from "./base/events";

export class GalleryCard extends BaseCard<GalleryCardData> {
  _category: HTMLElement;
  _image: HTMLImageElement;

  //TODO: проверить, что можно не дублировать унаследованные проперти
  constructor(container: HTMLElement, priceSelector: string, titleSelector: string, events: IEvents, categorySelector: string, imageSelector: string) {
    super(container, priceSelector, titleSelector, events);
    this._category = container.querySelector(categorySelector);
    this._image = container.querySelector(imageSelector);
  }

  set image(value: string) {
    this.setImage(this._image, value, this._title.textContent);
  }

  set category(value: string) {
    this.setText(this._category, value);
  }
}