const mongoose = require('mongoose');
const StockProductModel = require('../models/StockProduct');

const { stockProductSchema } = require('../helpers/stockProductValidator')

async function addStockProduct(req, res) {



      const {
        productref, category, unite,unitPrice, safetyStock, actualStock, status, expireAt, addedAt,yearlyOrders,costOfProcurement,possessionCost,
      } = req.body;
  
      const product = new StockProductModel({
        economicalQuantity : Math.round( Math.sqrt((2*yearlyOrders*costOfProcurement)/(unitPrice*possessionCost))),
      productref, category, unite,unitPrice, safetyStock, actualStock, status, expireAt, addedAt,yearlyOrders,costOfProcurement,possessionCost,
      });
      await product.save();
      return res.status(200).send({ msg: 'produit added' });
    
}

async function getAllStockProducts(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  try {
    const documentsNumber = await StockProductModel.countDocuments();
    const orders = await StockProductModel.find(query).skip((page - 1) * limit).limit(limit).populate('providerId');
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = orders;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('server error');
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

async function deleteStockProduct(req, res) {
  if (!checkObjectId(req, res)) return 1;
  try {
    const product = await StockProductModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Produit non trouvé' });
    return res.status(200).json({ msg: 'Le produit a été supprimé' });
  } catch (error) {
    return res.status(500).send({ msg: 'Server Error' });
  }
}
async function updateStockProduct(req, res) {
  if (!checkObjectId(req, res)) return 1;

  try {
    const {
      productref, category, unite,unitPrice, safetyStock, actualStock, status, expireAt, addedAt,yearlyOrders,costOfProcurement,possessionCost,
    } = req.body;
    const product = await StockProductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Produit non trouvé' });
    if (productref) product.productref = productref;
    if (category) product.category = category;
    if (status) product.status = status;
    if (unite) product.unite = unite;
    if (safetyStock) product.safetyStock = safetyStock;
    if (actualStock) product.actualStock = actualStock;
    if (expireAt) product.expireAt = expireAt;
    if (addedAt) product.addedAt = addedAt;
    if (unitPrice) product.unitPrice = unitPrice;
    if (yearlyOrders) product.yearlyOrders = yearlyOrders;
    if (costOfProcurement) product.costOfProcurement = costOfProcurement;
    if (possessionCost) product.possessionCost = possessionCost;


    await product.save();
    return res.status(200).json({ msg: 'Produit mis à jour' });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
}
module.exports = {
  addStockProduct, getAllStockProducts, deleteStockProduct, updateStockProduct,
};
