import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Google Search Tests', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should perform a basic search and validate results', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    await searchBox.submit();
  });

});
