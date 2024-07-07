import { AxiosHeaders, AxiosResponse } from "axios";
import { ExampleApi } from "../src/client/api";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../src/common/types";

export const PRODUCTS = [
	{
		"id": 0,
		"name": "Oriental kogtetochka",
		"price": 16
	},
	{
		"id": 1,
		"name": "Incredible kogtetochka",
		"price": 115
	},
	{
		"id": 2,
		"name": "Small kogtetochka",
		"price": 951
	},
]
export const PRODUCT = {
    "id": 0,
    "name": "Luxurious kogtetochka",
    "description": "Really Modern kogtetochka for Turkish Angora",
    "price": 109,
    "color": "purple",
    "material": "Concrete"
}

export class MockExampleApi extends ExampleApi {
    constructor(basename: string) {
		super(basename);
	}
	
    async getProducts() {
		let result : AxiosResponse<ProductShortInfo[], any> = {
			data: PRODUCTS,
			status: 200,
			statusText: "Success",
			headers: {},
			config: { headers: new AxiosHeaders() },
		  };
		return Promise.resolve(result);
    }
	async getProductById(id: number) {
		let result : AxiosResponse<Product, any> = {
			data: PRODUCT,
			status: 200,
			statusText: "Success",
			headers: {},
			config: { headers: new AxiosHeaders() },
		  };
        return Promise.resolve(result);
    }

    async checkout(form: CheckoutFormData, cart: CartState) {
		let result : AxiosResponse<CheckoutResponse, any> = {
			data: {id: 1},
			status: 200,
			statusText: "Success",
			headers: {},
			config: { headers: new AxiosHeaders() },
		  };
        return await Promise.resolve(result);
    }
}