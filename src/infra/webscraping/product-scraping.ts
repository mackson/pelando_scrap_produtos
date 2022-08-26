import playwright from 'playwright';
import moment from 'moment';
import { Product } from '../../domain/entities/product';
import { storeConfigs } from './store-configs';

export class ProductScraping{

  async handle(url: string): Promise<Product>{
    try{
      const browser = await playwright.chromium.launch();
    
      const page = await browser.newPage();
  
      await page.goto(url);
  
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
      
      const newProduct = new Product(
        {
          title: titleText && titleText.trim(),
          image: imageText && imageText,
          price: priceValue && priceValue,
          description: descriptionText && descriptionText.trim(),
          url: url,
          updatedAt: moment().toDate(),
        }
      );
      
      await browser.close();
  
      return newProduct;
    }catch(error){
      return error;
    }
   
  }

}