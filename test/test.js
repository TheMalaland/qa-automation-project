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

  // False positive: Expecting a non-existent element to be present
  it('should fail to find a non-existent element', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const nonExistentElement = await driver.findElements(By.xpath("//button[text()='Non Existent Element']"));
    expect(nonExistentElement.length).to.equal(1); // This will fail
  });

  // False negative: Expecting an element to be absent when it is present
  it('should fail to verify the Add Element button is absent', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    expect(addButton).to.be.null; // This will fail
  });

  // Intentional failure: Expecting incorrect text
  it('should fail to verify incorrect text', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    const buttonText = await addButton.getText();
    expect(buttonText).to.equal('Incorrect Text'); // This will fail
  });

  // Intentional failure: Expecting incorrect number of elements
  it('should fail to verify incorrect number of elements', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    for (let i = 0; i < 3; i++) {
      await addButton.click();
    }
    const deleteButtons = await driver.findElements(By.className('added-manually'));
    expect(deleteButtons.length).to.equal(5); // This will fail
  });

  // Intentional failure: Expecting incorrect URL
  it('should fail to verify incorrect URL', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal('https://incorrect-url.com'); // This will fail
  });

  // Intentional failure: Expecting incorrect class name
  it('should fail to verify incorrect class name', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.className('added-manually'));
    const className = await deleteButton.getAttribute('class');
    expect(className).to.include('incorrect-class'); // This will fail
  });

  // Intentional failure: Expecting incorrect element size
  it('should fail to verify incorrect element size', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.className('added-manually'));
    const size = await deleteButton.getSize();
    expect(size.width).to.equal(9999); // This will fail
  });

  // Intentional failure: Expecting incorrect element location
  it('should fail to verify incorrect element location', async function () {
    await driver.get('https://the-internet.herokuapp.com/add_remove_elements/');
    const addButton = await driver.findElement(By.xpath("//button[text()='Add Element']"));
    await addButton.click();
    const deleteButton = await driver.findElement(By.className('added-manually'));
    const location = await deleteButton.getLocation();
    expect(location.x).to.equal(9999); // This will fail
  });

});