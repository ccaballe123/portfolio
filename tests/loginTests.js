describe('Login Tests', function() {
  beforeEach(function(){
    browser.waitForAngularEnabled(false);
    browser.get('https://portfolio-47669.firebaseapp.com/');
  });

  afterEach(function() {
    browser.sleep(2000);
  });

  function initializeValues(emailVal, pwdVal) {
    var email = element(by.id('email'));
    var pwd = element(by.id('pwd'));
    var loginBtn = element(by.id('login_btn'));
    email.sendKeys(emailVal);
    pwd.sendKeys(pwdVal);

    loginBtn.click();

    browser.sleep(2000)

  }

  function errorTest(expected) {
    var errorResult = element(by.id('error')).getAttribute('innerHTML');
    expect(errorResult).toBe(expected);
  }

  // it('should check if the user is redirected to home page after successful login', function() {
  //   initializeValues("test@email.com", "testpassword");
  //   browser.sleep(1000);
  //   expect(browser.getCurrentUrl()).toBe('https://portfolio-47669.firebaseapp.com/home.html');
  // });

  // it('should check if the user exists', function() {
  //   initializeValues("userDoesNotExist@email.com", "123456");
  //   errorTest("There is no user record corresponding to this identifier. The user may have been deleted.");
  // });

  // it('should check if the user\'s password is correct', function() {
  //   initializeValues("test@email.com", "invalidPassword");
  //   errorTest("The password is invalid or the user does not have a password.");
  // });

  // it('should check if the user input a valid email address', function() {
  //   initializeValues("INVALID EMAIL", "testpassword");
  //   errorTest("The email address is badly formatted.");
  // });

  it('should check if google login authentication works correctly', function() {
    googleLogin = element(by.id('google_btn'));
    googleLogin.click();

    browser.sleep(5000);

    browser.getAllWindowHandles().then(function(handles){
      browser.switchTo().window(handles[1]).then(function(){
        //do your stuff on the pop up window
        var email = element(by.xpath('//*[@id="identifierId"]'));
        email.sendKeys('portfolio47699@gmail.com');
        var nextBtn = element(by.className('RveJvd snByac'));
        nextBtn.click();

        browser.sleep(5000);

        var pwd = element(by.xpath('//*[@id="password"]/div[1]/div/div[1]/input'));
        pwd.sendKeys('teamSegFault442');

        var nextBtnTwo = element(by.xpath('//*[@id="passwordNext"]/content/span'));
        nextBtnTwo.click();

      });
    });

    browser.sleep(5000);

    browser.getAllWindowHandles().then(function(handles){
      browser.switchTo().window(handles[0]).then(function(){
        //do your stuff on the pop up window
        var balance = element(by.id('balance'));
        balance.sendKeys('1234');
        var getStarted = element(by.id('initialize'));
        getStarted.click();
      });
    });

    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toBe('https://portfolio-47669.firebaseapp.com/home.html');

  });

});