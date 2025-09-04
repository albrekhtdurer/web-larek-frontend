# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура

Код приложения реализует парадигму MVP и разделен на следующие слои: 
- слой отображения - отвечает за отображение данных на странице; 
- слой модели данных - отвечает за сохранение и изменение данных приложения;
- слой презентера - отвечает за коммуникацию между описанными выше слоями.

NOTE: Кастомные интерфейсы и типы данных, используемые в приложении, описаны в `/src/types/index.ts`


### Слой отображения

1. Базовый класс Component<T> - Базовый класс для компонента отображения

* Конструктор:
  + constructor(protected readonly container: HTMLElement)

* Методы:
  + protected setText(element: HTMLElement, value: unknown): void - устанавливает текстовое значение для элемента
  + setDisabled(element: HTMLElement, state: boolean): void - меняет статус блокировки элемента
  + protected setHidden(element: HTMLElement): void - делает элемент скрытым
  + protected setVisible(element: HTMLElement): void - делает элемент видимым
  + protected setImage(element: HTMLImageElement, src: string, alt?: string): void - устанавливает изображение с альтернативным текстом
  + render(data?: Partial<T>): HTMLElement - отрисовывает элемент и возвращает корневой DOM-элемент (контейнер)

2. Класс Header (наследник класса Component<HeaderData>) - Класс для отображения галереи карточек товаров

* Поля:
  + counterClass: HTMLButtonElement - компонент span-поля с общим числом товаров в корзине
  + basketButton: HTMLElement - компонент кнопки открытия корзины
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + counterClass: string - css-класс для компонента span-поля с общим числом товаров в корзине
  + basketButtonClass: string - css-класс для компонента кнопки открытия корзины
  + events: IEvents - экземпляр брокера событий 

* Методы:
  + set counter(total: number): void - метод для установки значения общего числа товаров в корзине

3. Класс ProductGallery (наследник класса Component<GalleryData>) - Класс для отображения хедера

* Поля:
  + gallery: HTMLElement - компонент с галереей карточек
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + galleryClass: string - css-класс для компонента с галереей карточек
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set productCards(products: HTMLElement[]): void - метод для установки массива с товарами


4. Класс Modal (наследник класса Component<IModalData>) - Класс для модального окна

* Поля:
  + protected closeButton: HTMLButtonElement
  + protected content: HTMLElement
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + closeButtonClass: string - css-класс для кнопки закрытия модального окна
  + modalContentClass: string - css-класс для компонента контейнера содержимого модального окна
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set content(value: HTMLElement): void
  + open(): void - делает модальное окно видимым
  + close(): void - закрывает модальное окно
  + render(data: IModalData): HTMLElement - отрисовывает модальное окно

5. Класс BaseCard<T> (наследник класса Component<BaseCardData>) - базовый класс с минимальными данными карточки

* Поля:
 + price: HTMLElement - компонент span-поля с информацией о цене товара
 + title: HTMLElement - компонент span-поля с названием товара
 + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + priceClass: string - css-класс для компонента span-поля с информацией о цене товара
  + titleClass: string - css-класс для компонента span-поля с названием товара
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set title(value: string): void - метод для установки названия товара в карточке
  + set price(value: string): void - метод для установки цены товара в карточке

6. Класс BasketCard (наследник класса BaseCard<BasketCardData>) - класс для отображения товара в корзине

* Поля (помимо тех, что есть в родительском классе):
 + index: HTMLElement - компонент span-поля с номером товара в корзине
 + deleteButton: HTMLButtonElement - компонент кнопки для удаления из корзины

* Принимает в конструктор (помимо того, что в родительском классе):
  + indexClass: string - css-класс для компонента span-поля с номером товара в корзине
  + deleteButtonClass: string - css-класс для компонента кнопки удаления из корзины

* Методы:
  + set index(value: number): void - метод для установки номера товара в корзине

7. Класс GalleryCard (наследник класса BaseCard<GalleryCardData>) - класс для отображения товара в галерее

* Поля (помимо тех, что есть в родительском классе):
 + category: HTMLElement - компонент span-поля с категорией товара
 + image: HTMLImageElement - компонент с картинкой для товара

* Принимает в конструктор (помимо того, что в родительском классе):
  + categoryClass: string - css-класс для компонента span-поля с категорией товара
  + imageClass: string - css-класс для компонента картинки товара

* Методы:
  + set category(value: string): void - метод для установки категории товара
  + set image(value: string): void - метод для установки картинки товара

8. Класс ModalCard (наследник класса BaseCard<ModalCardData>) - класс для отображения товара в модальном окне

* Поля (помимо тех, что есть в родительском классе):
 + category: HTMLElement - компонент span-поля с категорией товара
 + image: HTMLImageElement - компонент с картинкой для товара
 + description: HTMLElement - компонент span-поля с категорией товара
 + basketButton: HTMLButtonElement - компонент кнопки для добавления в корзину (или удаления из корзины)

* Принимает в конструктор (помимо того, что в родительском классе):
  + categoryClass: string - css-класс для компонента span-поля с категорией товара
  + imageClass: string - css-класс для компонента картинки товара
  + imageClass: string - css-класс для компонента картинки товара
  + basketButtonClass: string - css-класс для компонент кнопки добавления в корзину

* Методы:
  + set category(value: string): void - метод для установки категории товара
  + set image(value: string): void - метод для установки картинки товара
  + set description(value: string): void - метод для установки описания товара
  + toggleBasketButton(): void - метод для смены текста кнопки добавления в корзину

9. Класс BaseForm<T> (наследник класса Component<BaseFormData>) - базовый класс для формы

* Поля (помимо тех, что есть в родительском классе):
  + submitButton: HTMLButtonElement - компонент с кнопкой отправки формы
  + validationError: HTMLElement - компонент с текстом ошибки валидации
  + errors: Record<string, string> - справочник с текстами ошибок, выводящихся в случае фейла валидации
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + submitButtonClass: string - css-класс для компонента кнопки отправки формы
  + validationErrorClass: string - css-класс для компонента ошибки валидации
  + errors: Record<string, string> - справочник с текстами ошибок, выводящихся в случае фейла валидации
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set submittButton(value: string): void - метод для установки текста кнопки отправки формы
  + set validationError(value: string): void - метод для установки текста ошибки валидации
  + setValid(): void - метод, делающий активной/неактивной кнопку отправки формы
  + getValues(): Record<string, string> - метод для получения значения полей формы

10. Класс FormEmailAndPhone (наследник класса BaseForm<FormEmailAndPhoneData>) - класс для формы с телефоном и Email

* Поля (помимо тех, что есть в родительском классе):
  + inputs: NodeListOf<HTMLInputElement> - все поля формы

* Принимает в конструктор (помимо того, что в родительском классе):
  + emailField: string - id для компонента с полем формы для ввода email
  + phoneField: string - id для компонента с полем формы для ввода телефона

11. Класс Form (наследник класса BaseForm<FormPaymentAndAddressData>) - класс для формы со способом оплаты и Email

* Поля (помимо тех, что есть в родительском классе):
  + inputs: NodeListOf<HTMLInputElement> - все поля формы

* Принимает в конструктор (помимо того, что в родительском классе):
  + addressField: string - id для компонента с полем формы для ввода адреса
  + buttonsField: string - id для компонента-контейнера с кнопками выбора оплаты

* Методы (помимо тех, что есть в родительском классе)
  + togglePaymentTypeButtons(): void - переключает кнопки с методом оплаты (делая неактивной ту кнопку, которую не выбрали)
  + getPaymentType(): string - получает тип оплаты в зависимости от выбранной кнопки

12. Класс ProductBasket (наследник класса Component<ProductBasket>)

* Поля:
  + items: HTMLElement - компонент со списком товаров в корзине
  + orderButton: HTMLButtonElement - компонент для кнопки оформления заказа
  + totalPrice: HTMLElement - компонент с ценой всех товаров в корзине
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + itemsClass: string - css-класс для компонента со списком товаров в корзине
  + orderButtonClass: string - css-класс для компонента со списком товаров в корзине
  + totalPriceClass: string - css-класс для компонента с ценой всех товаров
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set items(products: HTMLElement[]): void - метод для установки массива с товарами
  + set totalPrice(price: number): void - метод для установки общей цены

13. Класс SuccessMessage (наследник класса Component<SuccessData>)

* Поля:
  + payMessage: HTMLElement - компонент с сообщением об успешном заказе
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + payMessageClass: string - css-класс с сообщением об успешном заказе
  + totalPrice: number - сумма заказа
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set payMessage(): void - метод для установки сообщения об успешном заказе с ценой


### Слой модели

1. Базовый класс Model - Базовый класс для модели данных.

* Поля:
  + protected events: IEvents - экземпляр брокера событий


* Принимает в конструкторе:
  + events: IEvents - экземпляр брокера событий

* Методы:
  + emitChanges(event: string, payload: object): void - сообщает об изменениях в модели

2. Класс Catalogue (наследник класса Model) - Класс для хранения данных товаров в каталоге

* Поля:
  + protected products: IProduct[] - список данных товаров
  + selectedProduct: IProduct - объект выбранного товара

* Принимает в конструкторе (дополнительно к тому, что наследуется от родителя):
  + products: IProducts - список продуктов из внешнего источника

* Методы:
  + getProducts(): IProduct[] - получает все продукты
  + getSelectedProduct(): IProduct - получает выбранный продукт
  + setSelectedProduct(product: IProduct): void - сохраняет выбранный продукт
  + setProducts(products: IProduct[]): void - устанавливает свойство products для экземпляра

3. Класс Basket (наследник класса Model) - Класс для хранения данных товаров в корзине

* Поля:
  + protected products: IProduct[] - список данных товаров

* Методы:
  + getProducts(): IProduct[] - получает все продукты
  + getTotalPrice(): number - получает общую цену продуктов в корзине
  + getTotal(): number - получает общее количество продуктов в корзине
  + hasProduct(producId: number): boolean - проверяет, есть ли товар в корзине
  + toggleProductInBasket(id: string): void - меняет статус продукта (добавляет в корзине, если его там нет, и удаляет, если есть)

4. Класс User (наследник класса Model) - Класс для хранения данных товаров в корзине

  * Поля:
    + userData: IUser - данные пользователя
    + formErrors: FormErrors

  * Принимает в конструкторе (дополнительно к тому, что наследуется от родителя):
    * userData?: IUser - данные пользователя

  * Методы: 
    + setUserDataField(field: keyof IUser, value: string): void - устанавливает поле в объекте данных пользователя
    + getUserData(): IUser - получает данные пользователя
    + isDataValid(fields: []): boolean - валидирует выбранные данные пользователя


### Слой коммуникации

1. Класс LarekApi - класс для взаимодействия с серверной частью приложения.

* Поля:
  + protected baseApi: instanceof Api - экземпляр базового класса Api

* Принимает в конструкторе:
    * baseApi: instanceof Api - экземпляр базового класса Api

* Методы:
  + getProductList(): Promise<ApiListResponse<IProduct> - запрашивает с сервера список продуктов
  + sendOrder(order: IOrder) - Promise<IOrderResult> - отправляет на сервер заказ пользователя

## Взаимодействие компонентов (слой презентера)

Используется предложенный в стартовом ките базовый класс `EventEmitter`, имплементирующий интерфейс `IEvents`. Взаимодействие между компонентами описано в корневом файле `index.ts`. Экземпляр брокера событий передается в классы компонентов модели данных и отображения и позволяет выпускать события и подписываться на них.

В `index.ts` сначала создаются экземпляры всех классов, после чего настраивается обработка событий.

### Список генерируемых событий

#### События выпускаемые классами модели
- `user: changed` - изменение данных пользователя
- `basket: changed` - изменение данных в корзине
- `catalogue: changed` - изменение данных в каталоге товаров

#### События выпускаемые классами отображения (генерируются при взаимодействии пользователя с интерфейсом)

- `galleryCard: select` - выбор карточки товара из галереи для отображения в модальном окне
- `galleryCard: addToBasket` - добавление карточки в корзину
- `basket: deleteCard` - удаление карточки из корзины
- `basket: order` - оформление заказа в корзине
- `addressAndPayment: input` - изменение данных в форме со способом оплаты и адресом
- `emailAndPhone: input` - изменение данных в форме с email и телефоном
- `addressAndPayment: validation` - событие, сообщающее о необходимости валидации формы со способом оплаты и адресом
- `emailAndPhone: validation` - событие, сообщающее о необходимости валидации формы с email и телефоном
- `addressAndPayment: submit` - изменение данных в форме со способом оплаты и адресом
- `emailAndPhone: submit` - изменение данных в форме с email и телефоном

Например, при клике по карточке на главной странице:
- слой отображения выпускает событие `galleryCard: select`, также передает id карточки.
- презентер обрабатывает событие, вызывает метод модели данных, который обновляет данные 
- модель изменяет данные (в классе каталога меняется поле выбранного товара) и выпускает событие `catalogue: changed`
- презентер обрабатывает событие, передает данные от модели слою отображения и вызывает метод рендера
- слой отображения перерисовывает данные
- презентер выполняет открытие модального окна