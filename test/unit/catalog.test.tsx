import React from 'react';
import { CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import events from '@testing-library/user-event'
import { MockExampleApi, PRODUCTS } from '../helper';



describe('Каталог', () => {
	it('Список товаров отображается на странице', async () => {
		const api = new MockExampleApi('/hw/store');
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
		let item1 = screen.getAllByTestId(0)[1],
			item2 = screen.getAllByTestId(1)[1],
			item3 = screen.getAllByTestId(2)[1];
		
		expect(item1).toBeInTheDocument();
		expect(item2).toBeInTheDocument();
		expect(item3).toBeInTheDocument();

		expect(item1).toHaveAttribute("class", expect.stringMatching("ProductItem"));
		expect(item2).toHaveAttribute("class", expect.stringMatching("ProductItem"));
		expect(item3).toHaveAttribute("class", expect.stringMatching("ProductItem"));
	})

	it('Поля заголовка, цены, деталей в карточке товара отображаются корректно', async () => {
		const api = new MockExampleApi('/hw/store');
		const cart = new CartApi();
		const store = initStore(api, cart);
		const {container, getAllByTestId} = render(
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

		let item1 = screen.getAllByTestId(0)[1],
			item2 = screen.getAllByTestId(1)[1],
			item3 = screen.getAllByTestId(2)[1];

		expect(item1.querySelector('.card-title')).toBeInTheDocument()
		expect(item2.querySelector('.card-title')).toBeInTheDocument()
		expect(item3.querySelector('.card-title')).toBeInTheDocument()

		expect(item1.querySelector('.card-text')).toBeInTheDocument()
		expect(item2.querySelector('.card-text')).toBeInTheDocument()
		expect(item3.querySelector('.card-text')).toBeInTheDocument()

		expect(item1.querySelector('.card-link')).toBeInTheDocument()
		expect(item1.querySelector('.card-link')).toHaveAttribute("href", "/catalog/0")
		expect(item2.querySelector('.card-link')).toBeInTheDocument()
		expect(item2.querySelector('.card-link')).toHaveAttribute("href", "/catalog/1")
		expect(item3.querySelector('.card-link')).toBeInTheDocument()
		expect(item3.querySelector('.card-link')).toHaveAttribute("href", "/catalog/2")

		screen.logTestingPlaygroundURL();
	})
})