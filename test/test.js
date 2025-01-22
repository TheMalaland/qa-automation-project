//It is possible this proyect meets captcha issues. If you have any problem, please let me know.
//This is a simple test that uses the Selenium WebDriver to perform a Google search and validate the results.
//The test suite includes the following tests:
//1. Perform a basic search and validate the results.
//2. Test that the URL matches the expected URL.
//3. Test that the title matches the expected title.
//4. Test that special characters can be entered in the input field.
//5. Test that the search results are displayed.
//6. Test that the search results are displayed in the expected language.
//7. Test that the search results are displayed in the expected country.
//8. Test that the search results are displayed in the expected region.
//9. Test that the search results are displayed in the expected city.
//10. Test that the search results are displayed in the expected timezone.
//11. Test that the search results are displayed in the expected currency.
//12. Test that the search results are displayed in the expected temperature unit.
//13. Test that the search results are displayed in the expected distance unit.
//14. Test that the search results are displayed in the expected speed unit.
//15. Test that the search results are displayed in the expected pressure unit.


import { Builder, By } from 'selenium-webdriver'; // Import necessary modules from selenium-webdriver
import { expect } from 'chai'; // Import the expect assertion library from chai
import 'chromedriver'; // Import chromedriver to manage Chrome browser
import 'geckodriver'; // Import geckodriver to manage Firefox browser
import 'geckodriver'; // Import geckodriver to manage Firefox browser


const browsers = ['chrome', 'firefox', 'MicrosoftEdge']; // List of browsers to test

describe('Website Tests', function () {
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

      it('should test URL matches', async function () {
        await driver.get('https://the-internet.herokuapp.com/');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
      });

      it('should add elements and verify count', async function () {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
        for (let i = 0; i < 3; i++) {
          await addButton.click();
        }
        const deleteButtons = await driver.findElements(By.className('added-manually'));
        expect(deleteButtons.length).to.equal(3);
      });

      it('should fail to verify incorrect URL', async function () {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('https://incorrect-url.com'); // Esto fallará intencionalmente
      });

      it('should fail to verify incorrect class name', async function () {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
        await addButton.click();
        const deleteButton = await driver.findElement(By.className('added-manually'));
        const className = await deleteButton.getAttribute('class');
        expect(className).to.include('incorrect-class'); // Esto fallará intencionalmente
      });

      it('should fail to verify incorrect element size', async function () {
        await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
        const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
        for (let i = 0; i < 3; i++) {
          await addButton.click();
        }
        const deleteButtons = await driver.findElements(By.className('added-manually'));
        expect(deleteButtons.length).to.equal(5); // Esto fallará intencionalmente
      });
    });
  });
});