import { Component } from "./base/component";
import { GalleryData } from "../types";
import { IEvents } from "./base/events";

export class ProductGallery extends Component<GalleryData> {
  protected gallery: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;
  }

  set productCards(products: HTMLElement[]) {
    this.container.replaceChildren(...products);
  }
}