const { ObjectID } = require('mongodb');
const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { id } = req.params;

  if (!id) {
    context.res = {
      status: 400,
      body: 'Insira o ID do produto nos parâmetros',
    };
    return;
  }

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  const Products = MongoClient.collection('products');

  try {
    await Products.findOneAndDelete({ _id: ObjectID(id) });
    closeConnectionFn();
    context.res = {
      status: 200,
      body: 'Produto deletado com  successo!',
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'Erro ao deletar o produto ' + id,
    };
  }
};