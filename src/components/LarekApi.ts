import { Api } from "./base/api";
import { ApiListResponse } from "./base/api";
import { IProduct } from "../types";

export class LarekApi {
  protected baseApi: Api;

  constructor(baseApi: Api) {
    this.baseApi = baseApi;
  }

  getProductList(): Promise<IProduct[]> {
    return this.baseApi.get('/product').then(
      (data: ApiListResponse<IProduct>) => data.items);
  }

  //TODO: sendOrder()
}
