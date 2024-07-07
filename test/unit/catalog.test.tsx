import { Catalog } from '../../src/client/pages/Catalog';
import React from 'react';
import { CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ExampleApi } from '../../src/client/api';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event'
import { CartState, CheckoutFormData } from '../../src/common/types';

// export class MockExampleApi {
//     constructor(private readonly basename: string) {
// 	}
// 	products = [
// 		{
// 			"id": 0,
// 			"name": "Oriental kogtetochka",
// 			"price": 16
// 		},
// 		{
// 			"id": 1,
// 			"name": "Incredible kogtetochka",
// 			"price": 115
// 		},
// 		{
// 			"id": 2,
// 			"name": "Small kogtetochka",
// 			"price": 951
// 		},
// 		{
// 			"id": 3,
// 			"name": "Small kogtetochka",
// 			"price": 818
// 		},
// 		{
// 			"id": 4,
// 			"name": "Generic kogtetochka",
// 			"price": 586
// 		},
// 	]
//     async getProducts() {
// 		return Promise.resolve(this.products);
//     }
// 	async getProductById(id: number) {
//         return Promise.resolve(this.products.filter(p => p.id === id));
//     }

//     async checkout(form: CheckoutFormData, cart: CartState) {
//         return await Promise.resolve(form);
//     }
// }

describe('Каталог', () => {
	it('Список товаров отображается на странице', async () => {
		const api = new ExampleApi('/hw/store');
		const cart = new CartApi();
		const store = initStore(api, cart);
		
		const {container} = render(
			<MemoryRouter initialEntries={['/', '/catalog']} initialIndex={0}>
				<Provider store={store}>
					<Application/>
				</Provider>
			</MemoryRouter>
		)
		const catalog_btn = screen.getByRole('link', {
			name: /catalog/i
		})
		await events.click(catalog_btn)
		
		screen.logTestingPlaygroundURL();
	})
})