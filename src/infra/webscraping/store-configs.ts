export const storeConfigs = [
  {
    storeName: 'Amazon',
    storeDns: 'www.amazon.com.br',
    titleSelector: '#productTitle',
    imageSelector: '.a-dynamic-image',
    priceSelector: '.a-offscreen',
    descriptionSelector: '#productDescription > p > span',
  },
  {
    storeName: 'Saraiva',
    storeDns: 'www.saraiva.com.br',
    titleSelector: '.title',
    imageSelector: '.img-fluid.mx-auto.d-block.rounded.imgGaleryResponsive',
    priceSelector: '.mb-0.price-destaque',
    descriptionSelector: '#descricao',
  },
  {
    storeName: 'Zattini',
    storeDns: 'www.zattini.com.br',
    titleSelector: '.short-description > h1',
    imageSelector: '.photo-figure > .zoom',
    priceSelector: '.default-price > span > strong',
    descriptionSelector: 'p[itemprop=description]',
  },
];