import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import { API_URL, CDN_URL, CATEGORY_MAPPINGS } from './utils/constants';
import { LarekApi } from './components/LarekApi';
import { Catalogue } from './components/Catalogue';
import { ProductGallery } from './components/ProductGallery';
import { GalleryCard } from './components/GalleryCard';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();

const baseApi = new Api(API_URL);
const api = new LarekApi(baseApi, CDN_URL);

const catalogue = new Catalogue(events, []);

const galleryCardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const galleryNode = document.querySelector('.gallery') as HTMLElement;

const gallery = new ProductGallery(galleryNode, events);

api
	.getProductList()
	.then((data) => {
		catalogue.setProducts(data);
		console.log(catalogue);
	})
	.catch((err) => console.log(err));

events.on('catalogue: changed', () => {
  const productsHTMLList = catalogue.getProducts().map(item => new GalleryCard(cloneTemplate(galleryCardTemplate), '.card__price', '.card__title', events, '.card__category', '.card__image', CATEGORY_MAPPINGS).render(item));
  gallery.productCards = productsHTMLList;
  gallery.render();
})

