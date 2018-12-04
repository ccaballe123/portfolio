describe('Crypto Portfolio Graph Tests', function() {

  beforeAll(function(){
    browser.waitForAngularEnabled(false);
    browser.get('https://portfolio-47669.firebaseapp.com/');

    var email = element(by.id('email'));
    var pw = element(by.id('pwd'));
    var loginBtn = element(by.id('login_btn'));

    email.sendKeys('test@email.com');
    pw.sendKeys('testpassword');

    loginBtn.click();

    //wait until portfolio dropdown element is visible
    var until = protractor.ExpectedConditions;
    browser.wait(until.presenceOf(element(by.xpath('/html/body/div/nav/div[1]/button'))), 6000);

    //click on portfolio dropdown
    element(by.xpath('/html/body/div/nav/div[1]/button')).click();

    //click on cryptoportfolio
    element(by.xpath('/html/body/div/nav/div[1]/div/a[3]')).click();
  });

  function clickRow(n){
    browser.sleep(2000);
    
    //click on row specified by param n
    element(by.xpath('//*[@id="crypto_table"]/tbody/tr['+n+']')).click();

    browser.sleep(2500);
  }

  it('should check if specific graph/details for BTC shows up when BTC is clicked on table', function() {
    clickRow(2);

    var cryptoGraph = element(by.xpath('//*[@id="crypto_graph"]/div'));
    var cryptoDetails = element(by.xpath('//*[@id="crypto_details"]/div')); 

    expect(cryptoGraph.isDisplayed()).toBe(true);
    expect(cryptoDetails.isDisplayed()).toBe(true);
  });

  it('should check if specific graph/details for ETH shows up when ETH is clicked on table', function() {
    clickRow(3);

    var cryptoGraph = element(by.xpath('//*[@id="crypto_graph"]/div'));
    var cryptoDetails = element(by.xpath('//*[@id="crypto_details"]/div')); 

    expect(cryptoGraph.isDisplayed()).toBe(true);
    expect(cryptoDetails.isDisplayed()).toBe(true);
  });

  it('should check if specific graph/details for NEO shows up when NEO is clicked on table', function() {
    clickRow(4);

    var cryptoGraph = element(by.xpath('//*[@id="crypto_graph"]/div'));
    var cryptoDetails = element(by.xpath('//*[@id="crypto_details"]/div')); 

    expect(cryptoGraph.isDisplayed()).toBe(true);
    expect(cryptoDetails.isDisplayed()).toBe(true);
  });

  it('should check if specific graph/details for XRP shows up when XRP is clicked on table', function() {
    clickRow(5);

    var cryptoGraph = element(by.xpath('//*[@id="crypto_graph"]/div'));
    var cryptoDetails = element(by.xpath('//*[@id="crypto_details"]/div')); 

    expect(cryptoGraph.isDisplayed()).toBe(true);
    expect(cryptoDetails.isDisplayed()).toBe(true);
  });
});