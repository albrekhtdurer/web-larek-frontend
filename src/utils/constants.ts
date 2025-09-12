export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export const CATEGORY_MAPPINGS = {
  'другое': 'other',
  'софт-скил': 'soft',
  'дополнительное': 'additional',
  'кнопка': 'button',
  'хард-скил': 'hard'
}

export const ERROR_MAPPINGS = {
  payment: 'Необходимо выбрать способ оплаты',
	email: 'Необходимо указать e-mail',
	phone: 'Необходимо указать номер телефона',
	address: 'Необходимо указать адрес'
}

export const GALLERY_CARD_SELECTORS = {
  priceSelector: '.card__price',
  titleSelector: '.card__title',
  categorySelector: '.card__category',
  imageSelector: '.card__image'
}

export const MODAL_CARD_SELECTORS = {
  priceSelector: '.card__price',
  titleSelector: '.card__title',
  categorySelector: '.card__category',
  imageSelector: '.card__image',
  descriptionSelector: '.card__text',
  basketButtonSelector: '.card__button'
}

export const PRODUCT_BASKET_SELECTORS = {
  orderButtonSelector: '.basket__button',
  totalPriceSelector: '.basket__price', 
  basketItemsSelector: '.basket__list',
}

export const BASKET_CARD_SELECTORS = {
  indexSelector: '.basket__item-index',
  deleteButtonSelector: '.basket__item-delete',
  priceSelector: '.card__price',
  titleSelector: '.card__title',
}

export const FORM_PAYMENT_AND_ADDRESS_SELECTORS = {
  buttonsContainerSelector: '.order__buttons', 
  errorSelector: '.form__errors'
}

export const SUCCESS_SELECTORS = {
  totalSumSelector: '.order-success__description',
  closeButtonSelector: '.order-success__close'
}

export const MODAL_SELECTORS = {
  closeButtonSelector: '.modal__close',
  contentSelector: '.modal__content',
  elToBlocSelector: '.page__wrapper',
}
