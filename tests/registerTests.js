describe('Register Tests', function() {
  beforeEach(function(){
    browser.waitForAngularEnabled(false);
    browser.get('https://portfolio-47669.firebaseapp.com/');
  });

  afterEach(function() {
    browser.sleep(2000);
  });

  function initializeValues(emailVal, pwdOneVal, pwdTwoVal, balanceVal) {
    regBtn = element(by.id('register_btn'));

    regBtn.click();

    var email = element(by.id('email'));
    var pwd_one = element(by.id('pwd_one'));
    var confirm_pwd = element(by.id('pwd_two'));
    var balance = element(by.id('balance'));
    var createBtn = element(by.id('create'));

    email.sendKeys(emailVal);
    pwd_one.sendKeys(pwdOneVal);
    confirm_pwd.sendKeys(pwdTwoVal);
    balance.sendKeys(balanceVal);

    createBtn.click();

    browser.sleep(2000)

  }

  function errorTest(expected) {
    var errorResult = element(by.id('error')).getAttribute('innerHTML');
    expect(errorResult).toBe(expected);
  }

  it('Acceptance Test 1:', function() {
    initializeValues("regTest@email.com", "123456", "123456", "1000");
    browser.sleep(6000);
    expect(browser.getCurrentUrl()).toBe('https://portfolio-47669.firebaseapp.com/home.html');
  });

  it('Acceptance Test 2:', function() {
    initializeValues("", "123456", "123456", "1000");
    errorTest("Please input an email address.");
  });

  it('Acceptance Test 3:', function() {
    initializeValues("email@email.com", "", "123456", "1000");
    errorTest("Please fill out the first password field.");
  });

  it('Acceptance Test 4:', function() {
    initializeValues("email@email.com", "123456", "", "1000");
    errorTest("Please fill out the second password field.");
  });

  it('Acceptance Test 5:', function() {
    initializeValues("email@email.com", "123456", "123456", "");
    errorTest("Please input a correct balance.")
  });

  it('Acceptance Test 6:', function() {
    initializeValues("INVALID EMAIL", "123456", "123456", "1000");
    errorTest("The email address is badly formatted.");
  });

  it('Acceptance Test 7:', function() {
    initializeValues("DIFFERENTPASSWORDS@email.com", "654321", "123456", "1000");
    errorTest("Both passwords must be identical.");
  });

  it('Acceptance Test 8:', function() {
    initializeValues("WEAKPASSWORD@email.com", "12345", "12345", "1000");
    errorTest("Password should be at least 6 characters");
  });

  it('Acceptance Test 9:', function() {
    initializeValues("NEGATIVEBALANCE@email.com", "123456", "123456", "-1000");
    errorTest("Please input a balance greater than zero.");
  });

  it('Acceptance Test 10:', function() {
    initializeValues("INVALIDBALANCE@email.com", "123456", "123456", "123-456-7890");
    errorTest("Please input a correct balance.");
  });

  it('Acceptance Test 11:', function() {
    regBtn = element(by.id('register_btn'));
    regBtn.click();

    browser.sleep(1000);

    signInLink = element(by.id('signin'));
    signInLink.click();

    browser.sleep(1000);

    expect(browser.getCurrentUrl()).toBe('https://portfolio-47669.firebaseapp.com/index.html');

    browser.sleep(1000);
  });

});