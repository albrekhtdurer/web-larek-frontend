import { Component } from "../base/component";
import {ensureElement} from "../../utils/utils";
import {IEvents} from "../base/events";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, selectors: Record<string, string>, protected events: IEvents) {
        super(container);
        const {closeButtonSelector, contentSelector} = selectors;
        this.closeButton = ensureElement<HTMLButtonElement>(closeButtonSelector, container);
        this._content = ensureElement<HTMLElement>(contentSelector, container);

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}