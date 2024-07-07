import React from "react";
import { LocalStorageMock, MockExampleApi } from "../helper";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Cart } from "../../src/client/pages/Cart";
import { CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import { Application } from "../../src/client/Application";
import events from '@testing-library/user-event';

async function initialApp () {
	const api = new MockExampleApi('/hw/store');
	const cart = new CartApi();
	const store = initStore(api, cart);
	const {container, getAllByTestId} = render(
		<MemoryRouter>
			<Provider store={store}>
				<Cart/>
			</Provider>
		</MemoryRouter>
	)

	return {container, getAllByTestId, store}
}

beforeEach(async () => {
  global.localStorage = new LocalStorageMock();
  localStorage.setItem(
    "example-store-cart",
    JSON.stringify({
      "0": {
        name: "Solid kogtetochka",
        count: 3,
        price: 200,
      },
      "1": {
        name: "Luxury kogtetochka",
        count: 2,
        price: 1300,
      },
    })
  );
  await initialApp();
 
});

afterEach(() => {
  jest.clearAllMocks();
});


async function applyForm(name: string, phone: string, address: string) {
  const nameField = screen.getByRole("textbox", { name: "Name" });
  const phoneField = screen.getByRole("textbox", { name: "Phone" });
  const addressField = screen.getByRole("textbox", { name: "Address" });
  const checkout = screen.getByText("Checkout");
  await waitFor(() => {
    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.change(phoneField, { target: { value: phone } });
    fireEvent.change(addressField, { target: { value: address } });
  });

  fireEvent.click(checkout);
}

describe("Тестирование формы", () => {
  it("Валидация полей при неправильном вводе телефона", async () => {

    applyForm("lu", ")", "Moscow");

    await waitFor(() => {
      expect(screen.queryByText("Please provide a valid phone")).toBeVisible();
    });
  });
  it("Валидация полей при верных данных", async () => {

    applyForm("lu", "+90000000000", "Moscow");

    await waitFor(() => {
      expect(
        screen.queryByText("Please provide a valid phone")
      ).not.toBeInTheDocument();
    });
  });

  it("Показать сообщение об успехе при удачной обработке заказа", async () => {

    applyForm("lu", "+90000000000", "Moscow");

    await waitFor(() => {
      const successHeading = screen.getByText("Well done!");
      const formSuccessMessage = screen.getByText((_, element) => {
        return !!element && element.classList.contains("alert-success");
      });

      const successOrder = screen.getByText(
        "has been successfully completed.",
        { exact: false }
      );

      expect(successHeading).toBeInTheDocument();
      expect(formSuccessMessage).toBeInTheDocument();
      expect(successOrder).toBeInTheDocument();
      expect(successOrder.textContent).toEqual(
        "Order #1 has been successfully completed."
      );
    });
  });
  it("Очистить корзину после удачной обработки заказа", async () => {

    applyForm("lu", "+90000000000", "Moscow");

    await waitFor(() => {
      expect(localStorage.getItem("example-store-cart")).toStrictEqual("{}");
    });
  })
});
