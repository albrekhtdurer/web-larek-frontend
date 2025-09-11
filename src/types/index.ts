export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductWStatus extends IProduct{
  basketButtonStatus: string;
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

// NOTE: большая часть интерфейсов с данными отображения изменилась, т.к. типы данных для полей при исходной реализации не позволяли эффективно реализовать классы
// также был унифицирован нейминг
export interface IHeaderData {
	counter: number;
}

export interface IGalleryData {
	productCards: HTMLElement[];
}

export interface IModalData {
	content: HTMLElement;
}

export interface IBaseFormData {
  valid: boolean;
  errors: string[];
}

export interface IFormPaymentAndAddressData extends IBaseFormData {
	payment: string;
  address: string
}

export interface IProductBasket {
	items: HTMLElement[];
	totalPrice: number;
}

export interface ISuccessData {
  totalSum: number;
}