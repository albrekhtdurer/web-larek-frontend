import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, CATEGORY_MAPPINGS, ERROR_MAPPINGS } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { Catalogue } from './components/Catalogue';
import { ProductGallery } from './components/ProductGallery';
import { GalleryCard } from './components/GalleryCard';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ModalCard } from './components/ModalCard';
import { Modal } from './components/common/Modal';
import { Header } from './components/Header';
import { Basket } from './components/Basket';
import { ProductBasket } from './components/ProductBasket';
import { BasketCard } from './components/BasketCard';
import { FormPaymentAndAddress } from './components/FormPaymentAndAddress';
import { User } from './components/User';
import { IUser } from './types';
import { BaseForm } from './components/common/Form';

const events = new EventEmitter();
// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})

const baseApi = new Api(API_URL);
const api = new LarekApi(baseApi, CDN_URL);

const catalogue = new Catalogue(events, []);

const galleryCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const galleryCardSelectors = {
  priceSelector: '.card__price',
  titleSelector: '.card__title',
  categorySelector: '.card__category',
  imageSelector: '.card__image'
}
const galleryNode = document.querySelector('.gallery') as HTMLElement;

const gallery = new ProductGallery(galleryNode, events);

const modalCardTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const modalCardSelectors = {
  priceSelector: '.card__price',
  titleSelector: '.card__title',
  categorySelector: '.card__category',
  imageSelector: '.card__image',
  descriptionSelector: '.card__text',
  basketButtonSelector: '.card__button'
}

const modalCard = new ModalCard(cloneTemplate(modalCardTemplate), events, modalCardSelectors, CATEGORY_MAPPINGS);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const header = new Header(ensureElement<HTMLElement>('.header__container'), {counterSelector: '.header__basket-counter', basketButtonSelector: '.header__basket'},  events);

const basket = new Basket(events);

const productBasketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const productBasketSelectors = {
  orderButtonSelector: '.basket__button',
  totalPriceSelector: '.basket__price', 
  basketItemsSelector: '.basket__list',
}

const basketCardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketCardSelectors = {
  indexSelector: '.basket__item-index',
  deleteButtonSelector: '.basket__item-delete',
  priceSelector: '.card__price',
  titleSelector: '.card__title',
}

const productBasket = new ProductBasket(cloneTemplate(productBasketTemplate), productBasketSelectors, events);

const formPaymentAndAddressTemplate = document.querySelector('#order') as HTMLTemplateElement;
const formPaymentAndAddressSelectors = {
  buttonsContainerSelector: '.order__buttons', 
  errorSelector: '.form__errors'
}

const formPaymentAndAddress = new FormPaymentAndAddress(cloneTemplate(formPaymentAndAddressTemplate), 'addressAndPayment', formPaymentAndAddressSelectors, events, ERROR_MAPPINGS);

const formEmailAndPhoneTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const formEmailAndPhone = new BaseForm(cloneTemplate(formEmailAndPhoneTemplate), 'emailAndPhone', '.form__errors', events, ERROR_MAPPINGS);

const user = new User(events, {payment: '', address: '', phone: '', email: ''});

api
	.getProductList()
	.then((data) => {
		catalogue.setProducts(data);
		console.log(catalogue);
	})
	.catch((err) => console.log(err));

events.on('catalogue: changed', () => {
  const productsHTMLList = catalogue.getProducts().map(item => new GalleryCard(cloneTemplate(galleryCardTemplate), events, galleryCardSelectors, CATEGORY_MAPPINGS).render(item));
  gallery.productCards = productsHTMLList;
  gallery.render();
});

events.on('galleryCard: select', ({id}: {id: string}) => {
    const selectedProduct = catalogue.getProducts().find(item => item.id === id);
    const basketButtonStatus = !selectedProduct.price ? 'Недоступно' : basket.hasProduct(selectedProduct.id) ? 'Удалить из корзины' : 'Купить';
    const selectedProductForCard = {...selectedProduct, basketButtonStatus: basketButtonStatus};
    modal.render({content: modalCard.render(selectedProductForCard)});
});

events.on('basket: open', () => {
  modal.render({content: productBasket.render()});
});

events.on('galleryCard: addToBasket', ({id}: {id: string}) => {
  const product = catalogue.getProducts().find(item => item.id === id);
  basket.toggleProductInBasket(product);
  const basketButtonStatus = basket.hasProduct(product.id) ? 'Удалить из корзины' : 'Купить';
  const productForCard = {...product, basketButtonStatus: basketButtonStatus};
  modal.render({content: modalCard.render(productForCard)});
});

events.on('basket: deleteCard', ({id}: {id: string}) => {
  const product = catalogue.getProducts().find(item => item.id === id);
  basket.toggleProductInBasket(product);
  modal.render({content: productBasket.render()});
});


events.on('basket: changed', () => {
  const basketProductsHTMLList = basket.getProducts().map(function(product, index) {
    const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), events, basketCardSelectors);
    basketCard.index = index+1;
    return basketCard.render(product);
  });
  productBasket.render({items: basketProductsHTMLList, totalPrice: basket.getTotalPrice()});
  header.render({counter: basketProductsHTMLList.length});
});

events.on('basket: order', () => {
  const validationResult = user.validateFields(['address', 'payment']);
  modal.render({content: formPaymentAndAddress.render({valid: validationResult.isValid, errors: []})});
});

events.on('addressAndPayment: input', (data: { field: keyof IUser, value: string }) => {
  user.setUserDataField(data.field, data.value);
  const validationResult = user.validateFields(['address', 'payment']);
  formPaymentAndAddress.valid = validationResult.isValid;
  formPaymentAndAddress.errors = validationResult.invalidFields;
});

events.on('addressAndPayment: submit', () => {
  const validationResult = user.validateFields(['email', 'phone']);
  modal.render({content: formEmailAndPhone.render({valid: validationResult.isValid, errors: []})});
});


events.on('emailAndPhone: input', (data: { field: keyof IUser, value: string }) => {
  user.setUserDataField(data.field, data.value);
  const validationResult = user.validateFields(['email', 'phone']);
  formEmailAndPhone.valid = validationResult.isValid;
  formEmailAndPhone.errors = validationResult.invalidFields;
});

