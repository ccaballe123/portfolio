describe('Crypto Portfolio Table Tests', function() {
  it('check if an html table exists in crypto portfolio page', function() {
  	browser.waitForAngularEnabled(false);
    browser.get('https://portfolio-47669.firebaseapp.com/');

    var email = element(by.id('email'));
    var pw = element(by.id('pwd'));
    var loginBtn = element(by.id('login_btn'));


    email.sendKeys('test@email.com');
    pw.sendKeys('testpassword');

    browser.sleep(2000);
    loginBtn.click();

    //wait until portfolio dropdown element is visible
    var until = protractor.ExpectedConditions;
   	browser.wait(until.presenceOf(element(by.xpath('/html/body/div/nav/div[1]/button'))), 6000);

   	//click on portfolio dropdown
   	browser.sleep(2000);
   	element(by.xpath('/html/body/div/nav/div[1]/button')).click();

   	//click on cryptoportfolio
    browser.sleep(2000);
   	element(by.xpath('/html/body/div/nav/div[1]/div/a[3]')).click();

   	browser.sleep(2000);
   	var cryptoTable = element(by.id('crypto_table'));
    
    expect(cryptoTable.isDisplayed()).toBe(true);
    
  });
});