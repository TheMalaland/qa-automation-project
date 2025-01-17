import { Builder, By, until } from 'selenium-webdriver'; // Import necessary modules from selenium-webdriver
import { expect } from 'chai'; // Import the expect assertion library from chai
import 'chromedriver'; // Import chromedriver to manage Chrome browser

describe('Google Search Tests', function () { // Describe the test suite
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
    await driver.get('https://www.google.com');
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

});