describe("Каталог", () => {
	it('Список товаров отображается на странице', async ({browser}) => {
		await browser.url("http://localhost:3000/hw/store/catalog");
		const items = []
		let i = 0;
		let item = await browser.$$(`[data-testid]=${27}`);
		// while (item){
		// 	items.push(item);
		// 	i++
		// 	item = await browser.$$(`[data-testid]=${i}`);
		// }
		console.log('----------------');
		
	})
})