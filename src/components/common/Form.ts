import {IEvents} from "../base/events";
import {ensureElement} from "../../utils/utils";
import { Component } from "../base/component";
import { BaseFormData } from "../../types";

export class BaseForm<T> extends Component<BaseFormData> {
    protected name: string;
    protected submitButton: HTMLButtonElement;
    protected validationError: HTMLElement;
    protected _errors: Record<string, string>;

    constructor(protected container: HTMLFormElement, formName: string, errorSelector: string, protected events: IEvents, errorMapping: Record<string, string>) {
        super(container);
        console.log(this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this.validationError = ensureElement<HTMLElement>(errorSelector, this.container);
        this.name = formName;
        this._errors = errorMapping;
        this.container.addEventListener('input', (e: Event) => {
          const target = e.target as HTMLInputElement;
          const field = target.name as keyof T;
          const value = target.value;
          this.events.emit(`${this.name}: input`, {field, value});
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.name}: submit`);
        });
    }

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    set errors(errors: string[]) {
        let errorText = errors.reduce((text, field) => text = text + ' ' + this._errors[field] + ';', '');
        errorText = errorText.slice(1);
        this.setText(this.validationError, errorText);
    }

    getValues(): HTMLFormControlsCollection {
      return this.container.elements;
    }

    reset(): void {
        this.container.reset();
    }
}
