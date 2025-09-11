import { IHeaderData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Header extends Component<IHeaderData> {
  protected counterSpan: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected events: IEvents;

  constructor(container: HTMLElement, selectors: Record<string, string>, events: IEvents) {
    super(container);
    this.events = events;
    const {counterSelector, basketButtonSelector} = selectors;
    this.counterSpan = ensureElement<HTMLElement>(counterSelector, container);
    this.basketButton = ensureElement<HTMLButtonElement>(basketButtonSelector, container);
    console.log(this);
    this.basketButton.addEventListener('click', () => {this.events.emit('basket: open')});
    this.counter = 0;
  }

  set counter(total: number) {
    this.setText(this.counterSpan, total);
  }
}