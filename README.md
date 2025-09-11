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
  + protected setDisabled(element: HTMLElement, state: boolean): void - меняет статус блокировки элемента
  + protected setImage(element: HTMLImageElement, src: string, alt?: string): void - устанавливает изображение с альтернативным текстом
  + render(data?: Partial<T>): HTMLElement - отрисовывает элемент и возвращает корневой DOM-элемент (контейнер)

2. Класс Header (наследник класса Component<IHeaderData>) - Класс для отображения галереи карточек товаров

* Поля:
  + protected counterSpan: HTMLElement - компонент span-поля с общим числом товаров в корзине
  + protected basketButton: HTMLButtonElement - компонент кнопки открытия корзины
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов counterSpan и basketButton
  + events: IEvents - экземпляр брокера событий 

* Методы:
  + set counter(total: number) - метод для установки значения общего числа товаров в корзине

3. Класс ProductGallery (наследник класса Component<IGalleryData>) - Класс для отображения хедера

* Поля:
  + protected gallery: HTMLElement - компонент с галереей карточек
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set productCards(products: HTMLElement[]): void - метод для установки массива с товарами


4. Класс Modal (наследник класса Component<IModalData>) - Класс для модального окна

* Поля:
  + protected closeButton: HTMLButtonElement
  + protected _content: HTMLElement
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для кнопки закрытия модального окна и контента модального окна
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set content(value: HTMLElement): - устанавливает контент модального окна
  + open(): void - делает модальное окно видимым
  + close(): void - закрывает модальное окно
  + render(data: IModalData): HTMLElement - отрисовывает модальное окно

5. Класс BaseCard<T> (наследник класса Component<BaseCardData>) - базовый класс с минимальными данными карточки

* Поля:
  protected _price: HTMLElement - компонент span-поля с ценой товара
  protected _title: HTMLElement - компонент span-поля с названием товара
  protected _id: string - id карточки
  protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + priceSelector: string - селектор для компонента span-поля с информацией о цене товара
  + titleSelector: string - селектор для компонента span-поля с названием товара
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set title(value: string) - метод для установки названия товара в карточке
  + set price(value: string) - метод для установки цены товара в карточке
  + set id(value: string) - метод для установки id карточки
  + get id() - метод для получения id карточки

6. Класс BasketCard (наследник класса BaseCard<IProduct>) - класс для отображения товара в корзине

* Поля (помимо тех, что есть в родительском классе):
 + protected _index: HTMLElement - компонент span-поля с номером товара в корзине
 + protected deleteButton: HTMLButtonElement - компонент кнопки для удаления из корзины

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов родительского класса и селектором span-поля с индексом

* Методы:
  + set index(value: number): void - метод для установки номера товара в корзине

7. Класс GalleryCard (наследник класса BaseCard<IProduct>) - класс для отображения товара в галерее

* Поля (помимо тех, что есть в родительском классе):

  + protected _category: HTMLElement - компонент span-поля с категорией товара
  + protected _image: HTMLImageElement - компонент с картинкой для товара
  + protected categoryMappings: Record<string, string> - справочник с маппингом названия категории карточки и css-класса (с цветом категории)

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов родительского класса и селекторами для категории и картинки
  + categoryMappings: Record<string, string> - справочник с маппингом названия категории карточки и css-класса (с цветом категории)

* Методы:
  + set category(value: string) - метод для установки категории товара
  + set image(value: string) - метод для установки картинки товара

8. Класс ModalCard (наследник класса BaseCard<IProductWStatus>) - класс для отображения товара в модальном окне

* Поля (помимо тех, что есть в родительском классе):

  + protected _category: HTMLElement - компонент span-поля с категорией товара
  + protected _image: HTMLImageElement - компонент с картинкой для товара
  + protected _description: HTMLElement - компонент span-поля с категорией товара
  + protected categoryMappings: Record<string, string> - справочник с маппингом названия категории карточки и css-класса (с цветом категории)
  + protected basketButton: HTMLButtonElement - компонент кнопки для добавления в корзину (или удаления из корзины)

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов родительского класса и селекторами для категории, картинки и кнопки взаимодействия с корзиной
  + categoryMappings: Record<string, string> - справочник с маппингом названия категории карточки и css-класса (с цветом категории)

* Методы:
  + set category(value: string) - метод для установки категории товара
  + set image(value: string) - метод для установки картинки товара
  + set description(value: string) - метод для установки описания товара
  + set basketButtonStatus(value: string) - метод для установки текста и статуса кнопки добавления в корзину

9. Класс BaseForm<T> (наследник класса Component<IBaseFormData>) - базовый класс для формы

* Поля (помимо тех, что есть в родительском классе):
  + protected submitButton: HTMLButtonElement - компонент с кнопкой отправки формы
  + protectedvalidationError: HTMLElement - компонент с текстом ошибки валидации
  + protected _errors: Record<string, string> - справочник с текстами ошибок, выводящихся в случае фейла валидации
  + protected name: string - название формы
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + formName: string - название формы
  + errorSelector: string - селектор для компонента ошибки валидации
  + errorMapping: Record<string, string> - справочник с текстами ошибок, выводящихся в случае фейла валидации
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set errors(errors: string[]): - метод для установки текста ошибки валидации
  + set valid(): -  сеттер статуса формы (валидна/невалидна)
  + getValues(): HTMLFormControlsCollection - метод для получения полей формы
  + reset(): void - сбрасывает значения полей формы

10. Класс FormPaymentAndAddress (наследник класса BaseForm<IFormPaymentAndAddressData>) - класс для формы со способом оплаты и Email

* Поля (помимо тех, что есть в родительском классе):
  + protected cashButton: HTMLButtonElement - компонент с кнопкой оплаты "при получении"
  + protected cardButton: HTMLButtonElement - компонент с кнопкой оплаты "онлайн"

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селектором ошибок для родительского класса и селектором для контейнера с кнопками

* Методы (помимо тех, что есть в родительском классе)
  + togglePaymentTypeButtons(button: HTMLButtonElement): void - переключает кнопки с методом оплаты (делая неактивной ту кнопку, которую не выбрали)
  + reset(): void - сбрасывает значения полей формы (переопределен относительного родительского класса - нам также нужно делать кнопки неактивными)

11. Класс ProductBasket (наследник класса Component<IProductBasket>) -  класс для отображения корзины

* Поля:

  + protected _items: HTMLElement - компонент со списком товаров в корзине
  + protected orderButton: HTMLButtonElement - компонент для кнопки оформления заказа
  + protected _totalPrice: HTMLElement - компонент с ценой всех товаров в корзине
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов списка товаров, кнопки оформления и цены
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set items(products: HTMLElement[]) - сеттер для массива с товарами
  + set totalPrice(price: number) - сеттер для общей цены
  + toggleOrderButton(products: HTMLElement[]): void - переключает кнопку заказа, делая ее активной/неактивной

12. Класс SuccessMessage (наследник класса Component<ISuccessData>) - класс для отображения сообщения об успешном заказе

* Поля:
  + protected _totalSum: HTMLElement - компонент с сообщением о списанной сумме заказа
  + protected closeButton: HTMLButtonElement - компонент с кнопкой закрытия сообщения
  + protected events: IEvents - экземпляр брокера событий

* Принимает в конструктор (помимо того, что в родительском классе):
  + selectors: Record<string, string> - справочник с селекторами для компонентов сообщения о сумме и кнопки закрытия
  + totalNumber: number - сумма заказа
  + events: IEvents - экземпляр брокера событий

* Методы:
  + set totalSum(value: number) - сеттер для сообщения о списанной сумме заказа


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
  + protected selectedProduct: IProduct - объект выбранного товара

* Принимает в конструкторе (дополнительно к тому, что наследуется от родителя):
  + products: IProduct[] - список продуктов из внешнего источника

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
  + hasProduct(id: string): boolean - проверяет, есть ли товар в корзине
  + toggleProductInBasket(product: IProduct): void - меняет статус продукта (добавляет в корзине, если его там нет, и удаляет, если есть)
  + clearBasket(): void - удаляет все продукты из корзины

4. Класс User (наследник класса Model) - Класс для хранения данных товаров в корзине

  * Поля:
    + protected userData: IUser - данные пользователя

  * Принимает в конструкторе (дополнительно к тому, что наследуется от родителя):
    * userData: IUser - данные пользователя

  * Методы: 
    + setUserDataField(field: keyof IUser, value: string): void - устанавливает поле в объекте данных пользователя
    + getUserData(): IUser - получает данные пользователя
    + validateFields(fields: (keyof IUser)[]): {isValid: boolean, invalidFields: (keyof IUser)[]} - валидирует выбранные данные пользователя
    + clearUserData(): void - очищает данные пользователя


### Слой коммуникации

1. Класс LarekApi - класс для взаимодействия с серверной частью приложения.

* Поля:
  + protected baseApi: Api - экземпляр базового класса Api

* Принимает в конструкторе:
    * baseApi: Api - экземпляр базового класса Api

* Методы:
  + getProductList(): Promise<IProduct[]> - запрашивает с сервера список продуктов
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
- `basket: open` - открытие корзины
- `basket: deleteCard` - удаление карточки из корзины
- `basket: order` - оформление заказа в корзине
- `addressAndPayment: input` - изменение данных в форме со способом оплаты и адресом
- `emailAndPhone: input` - изменение данных в форме с email и телефоном
- `addressAndPayment: submit` - отправка формы со способом оплаты и адресом
- `emailAndPhone: submit` - отправка формы с email и телефоном
- `success: close` - клик по кнопке закрытия окна с сообщением об успешной оплате
- `order: success` - успешная отправка заказа на сервер

Например, при клике по карточке на главной странице:
- слой отображения выпускает событие `galleryCard: select`, также передает id карточки.
- презентер обрабатывает событие, вызывает метод модели данных, который обновляет данные 
- модель изменяет данные (в классе каталога меняется поле выбранного товара) и выпускает событие `catalogue: changed`
- презентер обрабатывает событие, передает данные от модели слою отображения и вызывает метод рендера
- слой отображения перерисовывает данные
- презентер выполняет открытие модального окна