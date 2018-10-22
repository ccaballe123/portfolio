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

  it('should check if user is redirected to home page after successful login', function() {
    initializeValues("regTest@email.com", "123456", "123456", "1000");
    browser.sleep(6000);
    expect(browser.getCurrentUrl()).toBe('https://portfolio-47669.firebaseapp.com/home.html');
  });

  it('should check if the user input an email address', function() {
    initializeValues("", "123456", "123456", "1000");
    errorTest("Please input an email address.");
  });

  it('should check if the user filled out the first password field', function() {
    initializeValues("email@email.com", "", "123456", "1000");
    errorTest("Please fill out the first password field.");
  });

  it('should check if user filled out the confirm password field', function() {
    initializeValues("email@email.com", "123456", "", "1000");
    errorTest("Please fill out the second password field.");
  });

  it('should check if user input a desired balance', function() {
    initializeValues("email@email.com", "123456", "123456", "");
    errorTest("Please input a correct balance.")
  });

  it('should check if the user input a valid email address', function() {
    initializeValues("INVALID EMAIL", "123456", "123456", "1000");
    errorTest("The email address is badly formatted.");
  });

  it('should check if the user input identical passwords', function() {
    initializeValues("DIFFERENTPASSWORDS@email.com", "654321", "123456", "1000");
    errorTest("Both passwords must be identical.");
  });

  it('should check if the user input a password with a length greater than 6', function() {
    initializeValues("WEAKPASSWORD@email.com", "12345", "12345", "1000");
    errorTest("Password should be at least 6 characters");
  });

  it('should check if the user input a positive value for their desired balance', function() {
    initializeValues("NEGATIVEBALANCE@email.com", "123456", "123456", "-1000");
    errorTest("Please input a balance greater than zero.");
  });

  it('should check if the user input a valid value for the desired balance. (ex: any number with a dash in between) ', function() {
    initializeValues("INVALIDBALANCE@email.com", "123456", "123456", "123-456-7890");
    errorTest("Please input a correct balance.");
  });

  it('should check if the user can go back to the login page if they happen to have an account already', function() {
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