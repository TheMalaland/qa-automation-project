import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import 'chromedriver';
import 'geckodriver';
import 'edgedriver';

const browsers = ['chrome', 'firefox', 'MicrosoftEdge'];

describe('Additional Website Tests', function () {
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

      it('should handle infinite scroll', async function () {
        await driver.get('https://the-internet.herokuapp.com/infinite_scroll');
        await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
        const paragraphs = await driver.findElements(By.css('.jscroll-added'));
        expect(paragraphs.length).to.be.at.least(1);
      });

      it('should handle inputs', async function () {
        await driver.get('https://the-internet.herokuapp.com/inputs');
        const input = await driver.findElement(By.css('input[type="number"]'));
        await input.sendKeys('123');
        const value = await input.getAttribute('value');
        expect(value).to.equal('123');
      });

      it('should handle jQuery UI menus', async function () {
        await driver.get('https://the-internet.herokuapp.com/jqueryui/menu');
        const enabledLink = await driver.findElement(By.id('ui-id-2'));
        await enabledLink.click();
        const downloadsLink = await driver.findElement(By.id('ui-id-4'));
        await downloadsLink.click();
        const pdfLink = await driver.findElement(By.id('ui-id-8'));
        await pdfLink.click();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('menu');
      });

      it('should handle JavaScript alerts', async function () {
        await driver.get('https://the-internet.herokuapp.com/javascript_alerts');
        const jsAlertButton = await driver.findElement(By.css('button[onclick="jsAlert()"]'));
        await jsAlertButton.click();
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        expect(alertText).to.equal('I am a JS Alert');
        await alert.accept();
      });

      it('should handle JavaScript error', async function () {
        await driver.get('https://the-internet.herokuapp.com/javascript_error');
        const logs = await driver.manage().logs().get('browser');
        const errorLog = logs.find(log => log.level.name === 'SEVERE');
        expect(errorLog.message).to.include('Cannot read properties of undefined');
      });

      it('should handle key presses', async function () {
        await driver.get('https://the-internet.herokuapp.com/key_presses');
        await driver.actions().sendKeys('A').perform();
        const result = await driver.findElement(By.id('result')).getText();
        expect(result).to.equal('You entered: A');
      });

      it('should handle large and deep DOM', async function () {
        await driver.get('https://the-internet.herokuapp.com/large');
        const largeTable = await driver.findElement(By.id('large-table'));
        expect(largeTable).to.exist;
      });

      it('should handle multiple windows', async function () {
        await driver.get('https://the-internet.herokuapp.com/windows');
        const link = await driver.findElement(By.linkText('Click Here'));
        await link.click();
        const windows = await driver.getAllWindowHandles();
        expect(windows.length).to.equal(2);
        await driver.switchTo().window(windows[1]);
        const newWindowText = await driver.findElement(By.tagName('h3')).getText();
        expect(newWindowText).to.equal('New Window');
      });

      it('should handle nested frames', async function () {
        await driver.get('https://the-internet.herokuapp.com/nested_frames');
        await driver.switchTo().frame('frame-top');
        await driver.switchTo().frame('frame-left');
        const bodyText = await driver.findElement(By.tagName('body')).getText();
        expect(bodyText).to.equal('LEFT');
      });

      it('should handle notification messages', async function () {
        await driver.get('https://the-internet.herokuapp.com/notification_message_rendered');
        const link = await driver.findElement(By.linkText('Click here'));
        await link.click();
        const message = await driver.findElement(By.id('flash')).getText();
        expect(message).to.include('Action successful');
      });

      it('should handle redirect links', async function () {
        await driver.get('https://the-internet.herokuapp.com/redirector');
        const link = await driver.findElement(By.id('redirect'));
        await link.click();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('status_codes');
      });
    });
  });
});