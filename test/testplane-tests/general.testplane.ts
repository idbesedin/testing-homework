describe("Общие требования", () => {
    it("Стили Главной страницы не должны меняться", async ({browser}) => {
        await browser.url("http://localhost:3000/hw/store");

        const home_page = await browser.$(".container.pt-4");

        await home_page.waitForDisplayed();

        await home_page.assertView('plane', {
            screenshotDelay: 1000,
        });
    });

    it("Стили страницы Условия Доставки не должны меняться", async ({browser}) => {
        await browser.url("http://localhost:3000/hw/store/delivery");

        const delivery_page = await browser.$(".container.pt-4");

        await delivery_page.waitForDisplayed();

        await delivery_page.assertView('plane', { ignoreDiffPixelCount: "5%" });
        
    });

    it("Стили страницы Контакты не должны меняться", async ({browser}) => {
        await browser.url("http://localhost:3000/hw/store/contacts");

        const contacts_page = await browser.$(".container.pt-4");

        await contacts_page.waitForDisplayed();

        await contacts_page.assertView('plane', { ignoreDiffPixelCount: "5%" });
    });
});