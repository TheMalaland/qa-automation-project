import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import 'chromedriver';
import 'geckodriver';
import 'edgedriver';

const browsers = ['chrome', 'firefox', 'MicrosoftEdge'];

describe('More Website Tests', function () {
  this.timeout(30000);
  let driver;

  browsers.forEach(browser => {
    describe(`Testing on ${browser}`, function () {
      before(async function () {
        driver = await new Builder()
          .usingServer('http://localhost:4444/wd/hub')
          .forBrowser(browser)
          .build();
      });

      after(async function () {
        await driver.quit();
      });

      it('should handle geolocation (positive)', async function () {
        await driver.get('https://the-internet.herokuapp.com/geolocation');
        const button = await driver.findElement(By.css('button'));
        await button.click();
        const latitude = await driver.findElement(By.id('lat-value')).getText();
        const longitude = await driver.findElement(By.id('long-value')).getText();
        expect(latitude).to.exist;
        expect(longitude).to.exist;
      });

      it('should handle geolocation (negative)', async function () {
        await driver.get('https://the-internet.herokuapp.com/geolocation');
        const button = await driver.findElement(By.css('button'));
        await button.click();
        const latitude = await driver.findElement(By.id('lat-value')).getText();
        const longitude = await driver.findElement(By.id('long-value')).getText();
        expect(latitude).to.not.equal('');
        expect(longitude).to.not.equal('');
      });

      it('should handle geolocation (fail)', async function () {
        await driver.get('https://the-internet.herokuapp.com/geolocation');
        const button = await driver.findElement(By.css('button'));
        await button.click();
        const latitude = await driver.findElement(By.id('lat-value')).getText();
        const longitude = await driver.findElement(By.id('long-value')).getText();
        expect(latitude).to.equal('0');
        expect(longitude).to.equal('0');
      });

      it('should handle shadow DOM (positive)', async function () {
        await driver.get('https://the-internet.herokuapp.com/shadowdom');
        const shadowHost = await driver.findElement(By.css('my-web-component'));
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost);
        const shadowContent = await shadowRoot.findElement(By.css('span')).getText();
        expect(shadowContent).to.equal('Let\'s have some different text!');
      });

      it('should handle shadow DOM (negative)', async function () {
        await driver.get('https://the-internet.herokuapp.com/shadowdom');
        const shadowHost = await driver.findElement(By.css('my-web-component'));
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost);
        const shadowContent = await shadowRoot.findElement(By.css('span')).getText();
        expect(shadowContent).to.not.equal('Incorrect text');
      });

      it('should handle shadow DOM (fail)', async function () {
        await driver.get('https://the-internet.herokuapp.com/shadowdom');
        const shadowHost = await driver.findElement(By.css('my-web-component'));
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost);
        const shadowContent = await shadowRoot.findElement(By.css('span')).getText();
        expect(shadowContent).to.equal('Incorrect text');
      });

      it('should handle typos (positive)', async function () {
        await driver.get('https://the-internet.herokuapp.com/typos');
        const typoText = await driver.findElement(By.css('.example p')).getText();
        expect(typoText).to.include('Sometimes you\'ll see a typo');
      });

      it('should handle typos (negative)', async function () {
        await driver.get('https://the-internet.herokuapp.com/typos');
        const typoText = await driver.findElement(By.css('.example p')).getText();
        expect(typoText).to.not.include('Always you\'ll see a typo');
      });

      it('should handle typos (fail)', async function () {
        await driver.get('https://the-internet.herokuapp.com/typos');
        const typoText = await driver.findElement(By.css('.example p')).getText();
        expect(typoText).to.include('Always you\'ll see a typo');
      });
    });
  });
});