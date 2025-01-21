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

  it('should test URL matches', async function () {
    await driver.get('https://the-internet.herokuapp.com/');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('https://the-internet.herokuapp.com/');
  });

  it('should open A/B Test variation', async function () {
    await driver.get('https://the-internet.herokuapp.com/');
    const abTestLink = await driver.findElement(By.linkText('A/B Testing'));
    await abTestLink.click();
    await driver.wait(until.urlIs('https://the-internet.herokuapp.com/abtest'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('https://the-internet.herokuapp.com/abtest');
  });
 //testing the elements of the page

  it('should add an element', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.className('added-manually'));
    expect(deleteButton).to.not.be.null;
  });

  it('should add and remove an element', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.className('added-manually'));
    await deleteButton.click();
    const deleteButtons = await driver.findElements(By.className('added-manually'));
    expect(deleteButtons.length).to.equal(0);
  });

  it('should add multiple elements', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    for (let i = 0; i < 5; i++) {
      await addButton.click();
    }
    const deleteButtons = await driver.findElements(By.className('added-manually'));
    expect(deleteButtons.length).to.equal(5);
  });

  it('should add and remove multiple elements', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    for (let i = 0; i < 5; i++) {
      await addButton.click();
    }
    let deleteButtons = await driver.findElements(By.className('added-manually'));
    for (let deleteButton of deleteButtons) {
      await deleteButton.click();
    }
    deleteButtons = await driver.findElements(By.className('added-manually'));
    expect(deleteButtons.length).to.equal(0);
  });

  it('should verify the Add Element button is present', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    expect(addButton).to.not.be.null;
  });

});