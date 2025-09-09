import { Api } from "./base/api";
import { ApiListResponse } from "./base/api";
import { IProduct } from "../types";

export class LarekApi {
  protected baseApi: Api;
  protected cdn: string;

  constructor(baseApi: Api, cdn: string) {
    this.baseApi = baseApi;
    this.cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.baseApi.get('/product').then(
      (data: ApiListResponse<IProduct>) => data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image
    }))
);
  }

  //TODO: sendOrder()
}
