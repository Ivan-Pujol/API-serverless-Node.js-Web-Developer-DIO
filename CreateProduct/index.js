const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const product = req.body || {};

  if (product) {
    context.res = {
      status: 400,
      body: 'Produto requerido',
    };
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');

  try {
    const products = await Products.insert(product);
    closeConnectionFn();
    context.res = { status: 201, body: products.ops[0] };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Erro ao inserir o produto',
    };
  }
};