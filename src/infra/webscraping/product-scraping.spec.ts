import playwright from 'playwright';
import moment from 'moment';
import { storeConfigs } from './store-configs';

jest.setTimeout(60000);

describe('Process Webscraping', () => {
  it('Should be able to process product webscraping into a store', async () => {
    
    const storeUrl = 'https://www.saraiva.com.br/mindset-9404582/p';

    const browser = await playwright.chromium.launch();
    
    const page = await browser.newPage();

    await page.goto(storeUrl);

    //find store by hostname and choose config attributes dinamicaly
    const storeHostname = await page.evaluate(() => document.location.hostname);

    const storeDns = storeConfigs.filter(store => store.storeDns === storeHostname);

    let titleText, imageText, priceValue, descriptionText = '';

    if(storeDns.length > 0){
      const titleSelector = await page.$(storeDns[0].titleSelector);
      titleText = titleSelector && await titleSelector.evaluate(element => element.innerHTML);
    
      const imageSelector = await page.$(storeDns[0].imageSelector);
      imageText = imageSelector && await imageSelector.evaluate(element => element.getAttribute('src'));

      const priceSelector = await page.$(storeDns[0].priceSelector);
      priceValue = priceSelector && await priceSelector.evaluate(element => element.innerHTML);

      const descriptionSelector = await page.$(storeDns[0].descriptionSelector);
      descriptionText = descriptionSelector && await descriptionSelector.evaluate(element => element.innerHTML);
    }

    const response = {
      title: titleText && titleText.trim(),
      image: imageText && imageText,
      price: priceValue && priceValue,
      description: descriptionText && descriptionText.trim(),
      url: storeUrl,
      updatedAt: moment().toDate(),
    };

    // console.log('Webscraping', response);

    const valuesArray = Object.values(response);
  
    for (const value of valuesArray) {
      expect(value).toBeTruthy();
    }

    await browser.close();

  });
});

test('Visit Page With Firefox', async () => {

  const browser = await playwright.firefox.launch();
    
  const page = await browser.newPage();
  
  await page.goto('https://www.saraiva.com.br/mindset-9404582/p');

  const pageTitle = await page.title();

  // console.log('Page Title From Firefox:', pageTitle);
  
  expect(pageTitle).toBe('Mindset - Saraiva');

  await browser.close();
});