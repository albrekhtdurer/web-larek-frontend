# Web Larek

A web page for a web development-themed online store. This is an educational project.

## Information and features

**Tech stack**: HTML, SCSS, TypeScript, Webpack. Frontend interactions are built using Vanilla TypeScript.

The project implements the MVP architecture. The code is divided into the following layers:

- **View layer**: responsible for displaying data on the page.
- **Model layer**: responsible for storing and managing data.
- **Presenter layer**: responsible for communication between the layers listed above.

NOTE: Custom interfaces and types are described in `/src/types/index.ts`.

A user can browse products in the store, view detailed product information by clicking on its card, add it to the basket, or remove the product from the basket. Users can view products in the basket and make an order.

## How to launch

Run the following script:

```bash
npm install
npm run start
```

or

```bash
yarn
yarn start
```

The page will be available at `http://localhost:8080/`.