//It is possible this proyect meets captcha issues. If you have any problem, please let me know.
//This is a simple test that uses the Selenium WebDriver to perform a Google search and validate the results.
//The test suite includes the following tests:
//1. Perform a basic search and validate the results.
//2. Test that the URL matches the expected URL.
//3. Test that the title matches the expected title.
//4. Test that special characters can be entered in the input field.

import { Builder, By, until } from 'selenium-webdriver'; // Import necessary modules from selenium-webdriver
import { expect } from 'chai'; // Import the expect assertion library from chai
import 'chromedriver'; // Import chromedriver to manage Chrome browser

describe('Website ', function () { // Describe the test suite
  this.timeout(30000);
  let driver; // Declare the driver variable


  // Before all tests, initialize the WebDriver
  before(async function () { 
    // Build the WebDriver for Chrome browser
    driver = await new Builder().forBrowser('chrome').build();
  });

   // After all tests, quit the WebDriver
  after(async function () { 
    await driver.quit();
  });

  it('should perform a basic search and validate results', async function () {
    await driver.get('https://the-internet.herokuapp.com/');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    await searchBox.submit();
  });

  it('should test URL matches', async function () {
    await driver.get('https://www.google.com');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('https://www.google.com/');
  });

  it('should test title matches', async function () {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.equal('Google');
  });

  it('should test special characters in the input field', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('!@#$%^&*()');
    await searchBox.submit();
    await driver.wait(until.titleContains('!@#$%^&*()'), 10000);
  });


});