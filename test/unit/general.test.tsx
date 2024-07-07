import React, { act } from 'react';

import { render, screen } from '@testing-library/react';

import {Application} from '../../src/client/Application';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';

export const initializeApp = (child: React.ReactNode) => {
    const api = new ExampleApi('/hw/store');
    const cart = new CartApi();
    const store = initStore(api, cart);
    const {container} = render(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Provider store={store}>
                {child}
            </Provider>
        </MemoryRouter>
    )
    return container
}

describe('Общие требования', () => {

    it('в шапке отображаются ссылки на страницы магазина (в том числе корзину)', async () => {
        // подготовка
        const container = initializeApp(<Application/>);

        // действие
        const links = container.querySelectorAll('.navbar-nav > .nav-link')
        const links_text = Array.from(links).map(link => link.textContent).join(' ')
        const links_href = Array.from(links).map(link => link.getAttribute('href'))

        // проверка
        expect(links_text).toBe('Catalog Delivery Contacts Cart')
        expect(links_href).toEqual(['/catalog', '/delivery', '/contacts', '/cart'])
    });

    it('название магазина в шапке должно быть ссылкой на главную страницу', async () => {
        const container = initializeApp(<Application/>);
        const shop_name = screen.getByRole('link', {
            name: /kogtetochka store/i
          })

        act(() => {
            shop_name.click()
        })

        expect(window.location.href).toBe("http://localhost/");
        // screen.logTestingPlaygroundURL();
    })

});
