import { SuccessData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class SuccessMessage extends Component<SuccessData> {
  protected _totalSum: HTMLElement;
  protected closeButton: HTMLButtonElement;
  protected events: IEvents;

  constructor(container: HTMLElement, selectors: Record<string, string>, events: IEvents, totalNumber: number) {
    super(container);
    const {totalSumSelector, closeButtonSelector} = selectors;
    this._totalSum = ensureElement<HTMLElement>(totalSumSelector, container);
    this.events = events;
    this.closeButton = ensureElement<HTMLButtonElement>(closeButtonSelector, container);
    this.totalSum = totalNumber;
  }

  set totalSum(value: number) {
    const totalSumMessage = 'Списано ' + value + ' синапсов'
    this.setText(this._totalSum, totalSumMessage);
  }
}