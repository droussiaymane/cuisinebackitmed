const mongoose = require('mongoose');
const ProviderModel = require('../models/Provider');
const StockOrderModel = require('../models/StockOrder');

const { providerSchema } = require('../helpers/providerValidator')

function errorHandling(err) {
  const response = {};
  if (err.code === 11000) {
    response.error = ' fournisseur existe déjà';
  }
  if (err.message.includes('Providers validation failed')) {
    const errors = Object.values(err.errors);
    errors.forEach(({ properties }) => {
      response[properties.path] = properties.message;
    });
  }
  return response;
}

async function providerRegister(req, res) {


 
      const {
        apeCode, companyName, representativeName, contact, email, category, specialty,
      } = req.body;
  
      const provider = new ProviderModel({
        apeCode,
        companyName,
        representativeName,
        contact,
        email,
        category,
        specialty,
      });
      await provider.save();
      return res.status(200).json({ msg: 'Le fournisseur a été ajouté' });
    
  
}

async function listProviders(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  try {
    const documentsNumber = await ProviderModel.countDocuments();
    const provider = await ProviderModel.find(query).skip((page - 1) * limit).limit(limit);
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = provider;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('Serever Error');
  }
}

// check if the ObjectId is valid
function checkObjectId(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ msg: 'Fournisseur introuvable' });
    return false;
  }
  return true;
}

async function deleteProvider(req, res) {
  if (!checkObjectId(req, res)) return 1;
  try {
    await StockOrderModel.deleteMany({ providerId: req.params.id });

    const provider = await ProviderModel.findByIdAndDelete(req.params.id);
    if (!provider) return res.status(404).json({ msg: 'Fournisseur introuvable' });
    return res.status(200).json({ msg: 'Fournisseur supprimé' });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

async function updateProvider(req, res) {
  if (!checkObjectId(req, res)) return 1;
  const {
    apeCode, companyName, representativeName, contact, email, category, specialty,
    iso, onssa, price, delay, conditions, temperatures, more,
  } = req.body;
  try {
    const provider = await ProviderModel.findById(req.params.id);
    if (!provider) return res.status(404).json({ msg: 'Fournisseur introuvable' });
    if (apeCode) provider.apeCode = apeCode;
    if (companyName) { provider.companyName = companyName; }
    if (representativeName) { provider.representativeName = representativeName; }
    if (contact) { provider.contact = contact; }
    if (email) provider.email = email;
    if (category) { provider.category = category; }
    if (specialty) { provider.specialty = specialty; }
    provider.criteria.iso = iso;
    provider.criteria.onssa = onssa;
    provider.criteria.price = price;
    provider.criteria.delay = delay;
    provider.criteria.conditions = conditions;
    provider.criteria.temperatures = temperatures;
    if (more) { provider.criteria.more = more; }

    await provider.save();
    return res.status(200).json({ msg: 'mis à jour' });
  } catch (error) {
    return res.status(500).json('Server error');
  }
}
module.exports = {
  providerRegister, listProviders, deleteProvider, updateProvider,
};
