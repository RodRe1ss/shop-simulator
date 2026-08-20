const constants = require("../constants");

const inventoryRepository = require("../repositories/inventoryRepository");

const generateCustomerBasket = async (availableProducts) => {
  // if (!availableProducts) {}

  const customerBasket = [];
  const basketAmount = Math.max(1 ,Math.floor(
    Math.random() * constants.MAX_CUSTOMER_BASKET,
  ))


  while (customerBasket.length < basketAmount) {
    const randomQuantity = Math.max(1, Math.floor(
      Math.random() * constants.MAX_PRODUCT_QUANTITY,
    ) + 1)
    let randomProduct;
    do {
      randomProduct =
        availableProducts[Math.floor(Math.random() * availableProducts.length)];
    } while (customerBasket.find((product) => product.productId === randomProduct.id));

    customerBasket.push({
      productId: randomProduct.id,
      quantity: randomQuantity,
    });
  }

  return customerBasket;
};

const products = async () =>
  await inventoryRepository.getByShopId("shop:47XNU8SlyOk9xtptWXNy6");

const test = async () => {
  const data = await products();

  const baskets = await generateCustomerBasket(data);

  console.log(baskets);
};

test();

module.exports = {
  generateCustomerBasket,
};
