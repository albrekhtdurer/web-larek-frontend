export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductWStatus extends IProduct{
  isInBasket: boolean;
}

export type PaymentType = 'card' | 'cash' | '';

export interface IUser {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
}

export interface IOrder extends IUser {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type FormErrors = Partial<Record<keyof IUser, string>>;

export interface HeaderData {
	counter: number;
}

export interface GalleryData {
	productCards: HTMLElement[];
}

export interface IModalData {
	content: HTMLElement;
}

export interface BaseCardData {
	price: HTMLElement;
	title: HTMLElement;
}

export interface BasketCardData extends BaseCardData {
	index: HTMLElement;
	button: HTMLButtonElement;
}

export interface GalleryCardData extends BaseCardData {
	category: HTMLElement;
	image: HTMLImageElement;
}

export interface ModalCardData extends GalleryCardData {
	description: HTMLElement;
}

export interface BaseFormData {
  valid: boolean;
  errors: string[];
}

export interface FormEmailAndPhoneData extends BaseFormData {
	inputs: NodeListOf<HTMLInputElement>;
}

export interface FormPaymentAndAddressData extends BaseFormData {
	inputs: NodeListOf<HTMLInputElement>;
}

export interface IProductBasket {
	items: HTMLElement[];
	totalPrice: number;
}
