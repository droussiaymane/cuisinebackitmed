const mongoose = require('mongoose');
const ProviderModel = require('../models/Provider');
const StockOrderModel = require('../models/StockOrder');

const { stockOrderSchema } = require('../helpers/stockOrderValidator')

async function makeStockOrder(req, res) {

  const { error, value } = stockOrderSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ error })
  } else {
    try {
      const {
        productLabel, productName, providerName, status, price, quantity, deliveryDate, creationDate,
      } = req.body;
      const provider = await ProviderModel.findOne({ representativeName: providerName });
      if (!provider) {
        if (!providerName) {
          return res
            .status(400)
            .json({ msg: 'Le nom du fournisseur est obligatoire' });
        }
        return res
          .status(400)
          .json({ msg: 'Fournisseur introuvable' });
      }
  
      const order = new StockOrderModel({
        providerId: provider.id,
        productLabel,
        productName,
        providerName,
        status,
        price,
        quantity,
        deliveryDate,
        creationDate,
      });
      await order.save();
      return res.status(200).send({ msg: 'commandé' });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

async function getAllStockOrders(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  try {
    const documentsNumber = await StockOrderModel.countDocuments();

    const orders = await StockOrderModel.find(query).skip((page - 1) * limit).limit(limit).populate('providerId');
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = orders;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// check if the ObjectId is valid
function checkObjectId(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ msg: 'Commande introuvable' });
    return false;
  }
  return true;
}

async function deleteStockOrder(req, res) {
  if (!checkObjectId(req, res)) return 1;
  try {
    const order = await StockOrderModel.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Commande introuvable' });
    return res.status(200).json({ msg: 'Commande supprimée' });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

async function updateStockOrder(req, res) {
  if (!checkObjectId(req, res)) return 1;

  try {
    const {
      productLabel, productName, providerName, status, price, quantity, deliveryDate,
    } = req.body;
    const order = await StockOrderModel.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Commande introuvable' });
    if (providerName) {
      const provider = await ProviderModel.findOne({ representativeName: providerName });
      if (!provider) {
        return res
          .status(400)
          .json({ msg: 'Fournisseur introuvable' });
      }
      order.providerId = provider.id;
    }
    if (productLabel) order.productLabel = productLabel;
    if (productName) order.productName = productName;
    if (status) order.status = status;
    if (price) order.price = price;
    if (quantity) order.quantity = quantity;
    if (deliveryDate) order.deliveryDate = deliveryDate;
    await order.save();
    return res.status(200).json({ msg: 'Commande mise à jour' });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
module.exports = {
  makeStockOrder, getAllStockOrders, deleteStockOrder, updateStockOrder,
};
