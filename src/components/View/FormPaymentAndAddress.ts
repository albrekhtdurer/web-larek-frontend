import { BaseForm } from "../common/BaseForm";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { IFormPaymentAndAddressData } from "../../types";

export class FormPaymentAndAddress extends BaseForm<IFormPaymentAndAddressData> {
  protected cashButton: HTMLButtonElement;
  protected cardButton: HTMLButtonElement;

  constructor(protected container: HTMLFormElement, formName: string, selectors: Record<string, string>, protected events: IEvents, errorMapping: Record<string, string>) {
    const {buttonsContainerSelector, errorSelector} = selectors;
    super(container, formName, errorSelector, events, errorMapping);

    const buttonsContainer = ensureElement<HTMLElement>(buttonsContainerSelector, container);
    this.cashButton = buttonsContainer.querySelector('button[name=cash]');
    this.cardButton = buttonsContainer.querySelector('button[name=card]');

    this.cashButton.addEventListener('click', () => {
      this.togglePaymentTypeButtons(this.cashButton);
      this.events.emit(`${this.name}: input`, {field: 'payment', value: 'cash'});
    });
    this.cardButton.addEventListener('click', () => {
      this.togglePaymentTypeButtons(this.cardButton);
      this.events.emit(`${this.name}: input`, {field: 'payment', value: 'card'});
    });
  }

  togglePaymentTypeButtons(button: HTMLButtonElement):void {
    if (button.name === 'cash') {
      this.cashButton.classList.add('button_alt-active');
      this.cardButton.classList.remove('button_alt-active');
    } else {
      this.cardButton.classList.add('button_alt-active');
      this.cashButton.classList.remove('button_alt-active');
    }
  }

  reset(): void {
    this.cardButton.classList.remove('button_alt-active');
    this.cashButton.classList.remove('button_alt-active');
    this.container.reset();
  }
}