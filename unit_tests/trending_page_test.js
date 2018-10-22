describe('Home Page Test Tables',function() {
	it('see if the tables show on the home pages', function() {
		browser.waitForAngularEnabled(false);
		browser.get('https://portfolio-47669.firebaseapp.com/');

		var email = element(by.id('email'));
		var pw = element(by.id('pwd'));
		var loginBtn = element(by.id('login_btn'));

		email.sendKeys('test@email.com');
		pw.sendKeys('testpassword');

		browser.sleep(2000);
		loginBtn.click();

		var until = protractor.ExpectedConditions;
		browser.wait(until.presenceOf(element(by.xpath('/html/body/div/nav/div[1]/button'))),6000);
		browser.sleep(2000);
		element(by.xpath('/html/body/div/nav/a')).click();

		browser.sleep(2000);
		var trendingCrypt = element(by.id('trending_crypto'));
		var trendingStock = element(by.id('trending_stock'));


		expect(trendingCrypt.isDisplayed()).toBe(true);
		expect(trendingStock.isDisplayed()).toBe(true);

	});



});