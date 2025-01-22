import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import 'chromedriver';
import 'geckodriver';
import 'edgedriver';

const browsers = ['chrome', 'firefox', 'MicrosoftEdge'];

describe('Advanced Website Tests', function () {
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

      it('should handle entry ad', async function () {
        await driver.get('https://the-internet.herokuapp.com/entry_ad');
        const modal = await driver.findElement(By.css('.modal'));
        const isDisplayed = await modal.isDisplayed();
        expect(isDisplayed).to.be.true;
        const closeButton = await driver.findElement(By.css('.modal-footer p'));
        await closeButton.click();
        const isClosed = await modal.isDisplayed();
        expect(isClosed).to.be.false;
      });

      it('should handle exit intent', async function () {
        await driver.get('https://the-internet.herokuapp.com/exit_intent');
        // Simulate mouse movement to trigger exit intent
        await driver.actions().move({ x: 0, y: 0 }).perform();
        const modal = await driver.findElement(By.css('.modal'));
        const isDisplayed = await modal.isDisplayed();
        expect(isDisplayed).to.be.true;
      });

      it('should handle file upload', async function () {
        await driver.get('https://the-internet.herokuapp.com/upload');
        const fileInput = await driver.findElement(By.id('file-upload'));
        const filePath = '/path/to/your/file.txt'; // Update with a valid file path
        await fileInput.sendKeys(filePath);
        const uploadButton = await driver.findElement(By.id('file-submit'));
        await uploadButton.click();
        const uploadedFiles = await driver.findElement(By.id('uploaded-files')).getText();
        expect(uploadedFiles).to.include('file.txt');
      });

      it('should handle floating menu', async function () {
        await driver.get('https://the-internet.herokuapp.com/floating_menu');
        const menu = await driver.findElement(By.id('menu'));
        const isDisplayed = await menu.isDisplayed();
        expect(isDisplayed).to.be.true;
      });

      it('should handle form authentication', async function () {
        await driver.get('https://the-internet.herokuapp.com/login');
        const username = await driver.findElement(By.id('username'));
        const password = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await username.sendKeys('tomsmith');
        await password.sendKeys('SuperSecretPassword!');
        await loginButton.click();
        const message = await driver.findElement(By.id('flash')).getText();
        expect(message).to.include('You logged into a secure area!');
      });

      it('should handle frames', async function () {
        await driver.get('https://the-internet.herokuapp.com/frames');
        const link = await driver.findElement(By.linkText('iFrame'));
        await link.click();
        await driver.switchTo().frame('mce_0_ifr');
        const editor = await driver.findElement(By.id('tinymce'));
        const text = await editor.getText();
        expect(text).to.equal('Your content goes here.');
      });

      it('should handle horizontal slider', async function () {
        await driver.get('https://the-internet.herokuapp.com/horizontal_slider');
        const slider = await driver.findElement(By.css('input[type="range"]'));
        await slider.sendKeys('3.5');
        const value = await driver.findElement(By.id('range')).getText();
        expect(value).to.equal('3.5');
      });

      it('should handle hovers', async function () {
        await driver.get('https://the-internet.herokuapp.com/hovers');
        const figure = await driver.findElement(By.css('.figure'));
        await driver.actions().move({ origin: figure }).perform();
        const caption = await driver.findElement(By.css('.figcaption h5')).getText();
        expect(caption).to.equal('name: user1');
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

      it('should handle secure file download', async function () {
        await driver.get('https://the-internet.herokuapp.com/download_secure');
        const username = await driver.findElement(By.id('username'));
        const password = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await username.sendKeys('tomsmith');
        await password.sendKeys('SuperSecretPassword!');
        await loginButton.click();
        const fileLink = await driver.findElement(By.css('.example a'));
        const fileName = await fileLink.getText();
        await fileLink.click();
        // Note: Actual file download verification would require additional setup
        expect(fileName).to.exist;
      });

      it('should handle shadow DOM', async function () {
        await driver.get('https://the-internet.herokuapp.com/shadowdom');
        const shadowHost = await driver.findElement(By.css('my-web-component'));
        const shadowRoot = await driver.executeScript('return arguments[0].shadowRoot', shadowHost);
        const shadowContent = await shadowRoot.findElement(By.css('span')).getText();
        expect(shadowContent).to.equal('Let\'s have some different text!');
      });

      it('should handle shifting content', async function () {
        await driver.get('https://the-internet.herokuapp.com/shifting_content');
        const link = await driver.findElement(By.linkText('Example 1: Menu Element'));
        await link.click();
        const menuItems = await driver.findElements(By.css('ul li'));
        expect(menuItems.length).to.be.at.least(5);
      });

      it('should handle slow resources', async function () {
        await driver.get('https://the-internet.herokuapp.com/slow');
        const slowElement = await driver.findElement(By.css('.example'));
        const isDisplayed = await slowElement.isDisplayed();
        expect(isDisplayed).to.be.true;
      });

      it('should handle sortable data tables', async function () {
        await driver.get('https://the-internet.herokuapp.com/tables');
        const table = await driver.findElement(By.id('table1'));
        const headers = await table.findElements(By.css('thead th'));
        expect(headers.length).to.equal(6);
      });

      it('should handle status codes', async function () {
        await driver.get('https://the-internet.herokuapp.com/status_codes');
        const link = await driver.findElement(By.linkText('200'));
        await link.click();
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('status_codes/200');
      });

      it('should handle typos', async function () {
        await driver.get('https://the-internet.herokuapp.com/typos');
        const typoText = await driver.findElement(By.css('.example p')).getText();
        expect(typoText).to.include('Sometimes you\'ll see a typo');
      });

      it('should handle WYSIWYG editor', async function () {
        await driver.get('https://the-internet.herokuapp.com/tinymce');
        await driver.switchTo().frame('mce_0_ifr');
        const editor = await driver.findElement(By.id('tinymce'));
        await editor.clear();
        await editor.sendKeys('Hello, World!');
        const text = await editor.getText();
        expect(text).to.equal('Hello, World!');
      });

      it('should handle geolocation', async function () {
        await driver.get('https://the-internet.herokuapp.com/geolocation');
        const button = await driver.findElement(By.css('button'));
        await button.click();
        const latitude = await driver.findElement(By.id('lat-value')).getText();
        const longitude = await driver.findElement(By.id('long-value')).getText();
        expect(latitude).to.exist;
        expect(longitude).to.exist;
      });
    });
  });
});