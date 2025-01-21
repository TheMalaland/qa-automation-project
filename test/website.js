import { Builder, By, until } from 'selenium-webdriver'; // Import necessary modules from selenium-webdriver
import { expect } from 'chai'; // Import the expect assertion library from chai
import 'chromedriver'; // Import chromedriver to manage Chrome browser

describe('Basic Website Tests', function () {
    this.timeout(30000);
    let driver;
  
    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
    }); 

    after(async function () {
        await driver.quit();
      });
    

    it('should load the correct URL', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
      });
    
      it('should have the correct title', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const title = await driver.getTitle();
        expect(title).to.equal('The Internet');
      });
    
      it('should load within acceptable time', async function () {
        const start = new Date().getTime();
        await driver.get('https://the-internet.herokuapp.com/');
        const end = new Date().getTime();
        const loadTime = end - start;
        expect(loadTime).to.be.below(5000); // Expect load time to be below 5 seconds
      });
    
      it('should find the heading element', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const heading = await driver.findElement(By.tagName('h1'));
        expect(await heading.isDisplayed()).to.be.true;
      });
    
      it('should find the footer element', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const footer = await driver.findElement(By.id('page-footer'));
        expect(await footer.isDisplayed()).to.be.true;
      });

});