const mongoose = require('mongoose');
const PatientModel = require('../models/Patient');
const OrderModel = require('../models/Order');

const { orderSchema } = require('../helpers/orderValidator')

async function makeOrder(req, res) {



      const {
        ssNumber, disease, meal,
      } = req.body;
      const patient = await PatientModel.findOne({ ssNumber });
      if (!patient) {
        return res
          .status(400)
          .json({ msg: 'Patient non trouvé' });
      }
      const order = new OrderModel({
        patientId: patient.id,
        disease,
        meal,
      });
      await order.save();
      return res.status(200).send({ msg: 'commandé' });
    
  
}

async function getAllOrders(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  try {
    const documentsNumber = await OrderModel.countDocuments();
    const orders = await OrderModel.find(query).skip((page - 1) * limit).limit(limit).populate('patientId');
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = orders;

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('Server Error');
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

async function deleteOrder(req, res) {
  if (!checkObjectId(req, res)) return 1;
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Commande introuvable' });
    return res.status(200).json({ msg: 'Commande supprimée' });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

async function updateOrder(req, res) {
  if (!checkObjectId(req, res)) return 1;

  try {
    const {
      ssNumber, particularity, status, disease
    } = req.body;
    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Commande introuvable' });
    if (ssNumber) {
      const patient = await PatientModel.findOne({ ssNumber });
      if (!patient) {
        return res
          .status(400)
          .json({ msg: 'Patient introuvable' });
      }
      order.ssNumber = ssNumber;
    }
    if (particularity) order.particularity = particularity;
    if (status) order.status = status;
    if (disease) order.disease = disease;

    await order.save();
    return res.status(200).json({ msg: 'Commande mise à jour' });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
}
module.exports = {
  makeOrder, getAllOrders, deleteOrder, updateOrder,
};
