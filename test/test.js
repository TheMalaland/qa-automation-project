import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Google Search Tests', function () {
  this.timeout(30000);
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

    const firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);
    expect(await firstResult.getText()).to.include('Mundial');
  });

  it('should validate autocomplete suggestions', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('mundial mex');

    const suggestions = await driver.wait(until.elementsLocated(By.css('.sbct')), 10000);
    const texts = await Promise.all(suggestions.map(el => el.getText()));
    expect(texts.some(text => text.includes('Mundial México 2026'))).to.be.true;
  });

  it('should change language to Spanish', async function () {
    await driver.get('https://www.google.com/preferences');
    const langDropdown = await driver.findElement(By.xpath("//div[text()='Language']"));
    await langDropdown.click();
    const spanishOption = await driver.findElement(By.xpath("//span[text()='Español']"));
    await spanishOption.click();
    const saveButton = await driver.findElement(By.xpath("//button[text()='Save']"));
    await saveButton.click();

    const searchButtonText = await driver.findElement(By.name('btnK')).getAttribute('value');
    expect(searchButtonText).to.equal('Buscar con Google');
  });

  it('should use the "I\'m Feeling Lucky" button', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    const luckyButton = await driver.findElement(By.name('btnI'));
    await luckyButton.click();

    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.not.include('search');
  });

  it('should validate the first 5 result links', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    await searchBox.submit();

    const resultLinks = await driver.findElements(By.css('a'));
    for (let i = 0; i < 5; i++) {
      const href = await resultLinks[i].getAttribute('href');
      expect(href).to.match(/^https?:\/\//);
    }
  });

  it('should play a video from search results', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('tráiler Mundial 2026');
    await searchBox.submit();

    const videoLink = await driver.wait(until.elementLocated(By.css('a[href*="youtube.com"]')), 10000);
    await videoLink.click();

    const videoPlayer = await driver.wait(until.elementLocated(By.css('video')), 10000);
    expect(await videoPlayer.isDisplayed()).to.be.true;
  });

  it('should filter by images', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    await searchBox.submit();

    const imagesTab = await driver.findElement(By.linkText('Images'));
    await imagesTab.click();

    const results = await driver.wait(until.elementsLocated(By.css('img')), 10000);
    expect(results.length).to.be.greaterThan(0);
  });

  it('should interact with Google Maps', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Estadios Mundial 2026');
    await searchBox.submit();

    const mapsLink = await driver.wait(until.elementLocated(By.css('a[href*="maps.google"]')), 10000);
    await mapsLink.click();

    const mapsLogo = await driver.wait(until.elementLocated(By.css('.widget-maps')), 10000);
    expect(await mapsLogo.isDisplayed()).to.be.true;
  });

  it('should validate related searches', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Mundial México 2026');
    await searchBox.submit();

    const relatedSearches = await driver.findElements(By.css('#bres > div > div > a'));
    expect(relatedSearches.length).to.be.greaterThan(0);
  });

  it('should access Google settings and modify them', async function () {
    await driver.get('https://www.google.com');
    const settingsButton = await driver.findElement(By.linkText('Settings'));
    await settingsButton.click();

    const safeSearchToggle = await driver.findElement(By.id('safeSearchToggle'));
    const isChecked = await safeSearchToggle.getAttribute('aria-checked');
    expect(isChecked).to.be.oneOf(['true', 'false']);
  });
});
