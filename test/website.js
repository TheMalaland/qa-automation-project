// documentation: https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index.html

import { Builder, By, until } from 'selenium-webdriver'; // Import necessary modules from selenium-webdriver
import { expect } from 'chai'; // Import the expect assertion library from chai
import 'chromedriver'; // Import chromedriver to manage Chrome browser
import 'geckodriver'; // Import geckodriver to manage Firefox browser
import 'edgedriver'; // Import edgedriver to manage Edge browser

const browsers = ['chrome', 'firefox', 'MicrosoftEdge']; // List of browsers to test

describe('Basic Website Tests', function () {
  this.timeout(30000);
  let driver;

  browsers.forEach(browser => {
    describe(`Testing on ${browser}`, function () {
      before(async function () {
        driver = await new Builder()
          .usingServer('http://localhost:4444/wd/hub') // URL del Hub de Selenium Grid
          .forBrowser(browser)
          .build();
      });

      after(async function () {
        await driver.quit();
      });

      it('should load the correct URL', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
      });

      it('should add and remove elements', async function () {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
        await addButton.click();
        await addButton.click();
        const deleteButtons = await driver.findElements(By.className('added-manually'));
        expect(deleteButtons.length).to.equal(2);
        await deleteButtons[0].click();
        const remainingButtons = await driver.findElements(By.className('added-manually'));
        expect(remainingButtons.length).to.equal(1);
      });

      it('should handle basic authentication', async function () {
        await driver.get('https://admin:admin@the-internet.herokuapp.com/basic_auth');
        const message = await driver.findElement(By.css('.example p')).getText();
        expect(message).to.include('Congratulations');
      });

      it('should handle broken images', async function () {
        await driver.get('https://the-internet.herokuapp.com/broken_images');
        const images = await driver.findElements(By.css('img'));
        for (let img of images) {
          const isDisplayed = await img.isDisplayed();
          expect(isDisplayed).to.be.true;
        }
      });

      it('should handle challenging DOM', async function () {
        await driver.get('https://the-internet.herokuapp.com/challenging_dom');
        const table = await driver.findElement(By.css('table'));
        expect(table).to.exist;
      });

      it('should handle checkboxes', async function () {
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
        const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
        expect(checkboxes.length).to.equal(2);
        await checkboxes[0].click();
        const isChecked = await checkboxes[0].isSelected();
        expect(isChecked).to.be.true;
      });

      it('should handle context menu', async function () {
        await driver.get('https://the-internet.herokuapp.com/context_menu');
        const box = await driver.findElement(By.id('hot-spot'));
        await driver.actions().contextClick(box).perform();
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        expect(alertText).to.equal('You selected a context menu');
        await alert.accept();
      });

      it('should handle disappearing elements', async function () {
        await driver.get('https://the-internet.herokuapp.com/disappearing_elements');
        const elements = await driver.findElements(By.css('ul li a'));
        expect(elements.length).to.be.at.least(4);
      });

      it('should handle drag and drop', async function () {
        await driver.get('https://the-internet.herokuapp.com/drag_and_drop');
        const columnA = await driver.findElement(By.id('column-a'));
        const columnB = await driver.findElement(By.id('column-b'));
        await driver.actions().dragAndDrop(columnA, columnB).perform();
        const headerA = await columnA.findElement(By.tagName('header')).getText();
        expect(headerA).to.equal('B');
      });

      it('should handle dropdown', async function () {
        await driver.get('https://the-internet.herokuapp.com/dropdown');
        const dropdown = await driver.findElement(By.id('dropdown'));
        await dropdown.click();
        const option = await driver.findElement(By.css('#dropdown option[value="1"]'));
        await option.click();
        const selectedOption = await dropdown.getAttribute('value');
        expect(selectedOption).to.equal('1');
      });

      it('should handle dynamic content', async function () {
        await driver.get('https://the-internet.herokuapp.com/dynamic_content');
        const content = await driver.findElements(By.css('#content .row'));
        expect(content.length).to.equal(3);
      });

      it('should handle dynamic controls', async function () {
        await driver.get('https://the-internet.herokuapp.com/dynamic_controls');
        const checkbox = await driver.findElement(By.css('#checkbox'));
        const removeButton = await driver.findElement(By.css('#checkbox-example button'));
        await removeButton.click();
        await driver.wait(until.elementIsNotVisible(checkbox), 5000);
        const message = await driver.findElement(By.id('message')).getText();
        expect(message).to.equal("It's gone!");
      });

      it('should handle dynamic loading', async function () {
        await driver.get('https://the-internet.herokuapp.com/dynamic_loading/1');
        const startButton = await driver.findElement(By.css('#start button'));
        await startButton.click();
        const finishText = await driver.wait(until.elementLocated(By.id('finish')), 10000).getText();
        expect(finishText).to.equal('Hello World!');
      });

      it('should handle file download', async function () {
        await driver.get('https://the-internet.herokuapp.com/download');
        const fileLink = await driver.findElement(By.css('.example a'));
        const fileName = await fileLink.getText();
        await fileLink.click();
        // Note: Actual file download verification would require additional setup
        expect(fileName).to.exist;
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
    });
  });
});