const { query } = require('express');
const KitchenOrder = require('../models/KitchenOrder')
const Patient = require('../models/Patient')

const { kitchenOrderSchema } = require('../helpers/kitchenOrderValidator')

async function submitOrder(req, res) {

  const { error, value } = kitchenOrderSchema.validate(req.body)

  if (error) {
    return res.status(400).json({ error })
  } else {
    const { service, meal, status, staffNbr } = req.body;
    let message = '';

    try {
      const check = await KitchenOrder.findOne({ service, meal, "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, recycled: false })
      // const check = await KitchenOrder.findOne({ service, meal ,recycled:false})
      if (check) {
        if (check.status === 'Servi')
          message = `La commande est servie`
        else if (check.status === 'Lancement')
          message = `La commande est lancée`
        else
          message = `La commande est en ${check.status}`

        return res.status(400).json({ msg: message });

      }

      const order = new KitchenOrder({
        service,
        meal,
        status,
        staffNbr
      })
      await order.save()
      return res.status(200).json({ msg: 'La commande a été ajouté' });

    } catch (error) {
      console.log(error);
      return res.status(500).send('server error');
    }
  }
}


async function listOrders(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const today = parseInt(req.query.today);
  const status = req.query.status
  const recycled = parseInt(req.query.recycled);
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  if (today)
    query = { ...query, "createdAt": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
  if (recycled)
    query = { ...query, recycled: true }
  else
    query = { ...query, recycled: false }
  if (status)
    query = { ...query, status }

  try {
    const documentsNumber = await KitchenOrder.countDocuments(query);
    const orders = await KitchenOrder.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = orders;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('Serever Error');
  }

}


async function deleteOrder(req, res) {
  try {
    const order = await KitchenOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'order introuvable' });
    return res.status(200).json({ msg: 'order supprimée' });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

async function getOrderInfo(req, res) {
  const results = {}
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  try {
    const order = await KitchenOrder.findById(req.params.id);

    if (order) {
      const docCount = await Patient.find({ active: true, service: order.service })
        .countDocuments();
      const docCountsalt = await Patient.find({
        active: true,
        service: order.service, 'foodParticularity.salt': true
      })
        .countDocuments();
      const docCountsugar = await Patient.find({
        active: true, service: order.service,
        'foodParticularity.sugar': true
      }).countDocuments();
      const docCountsugarsalt = await Patient.find({
        active: true, service: order.service,
        'foodParticularity.sugar': true, 'foodParticularity.salt': true
      }).countDocuments();

      const patients = await Patient.find({
        active: true,
        service: order.service
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      results.total_pages = Math.ceil(docCount / limit);
      results.page = page;
      results.totalMeals = docCount + order.staffNbr;
      results.withoutSalt = docCountsalt - docCountsugarsalt;
      results.withoutSugar = docCountsugar - docCountsugarsalt;
      results.withoutSugarSalt = docCountsugarsalt;
      results.mealType = order.meal
      results.data = patients;
      return res.status(200).json(results)
    }
  } catch (error) {
    return res.status(500).send('Server Error');

  }

}
async function updateOrder(req, res) {

  try {
    const {
      service, meal, status, staffNbr
    } = req.body;
    const order = await KitchenOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Commande introuvable' });

    if (service) order.service = service;
    if (status) order.status = status;
    if (meal) order.meal = meal;
    if (staffNbr) order.staffNbr = staffNbr;


    await order.save();
    return res.status(200).json({ msg: 'Commande mise à jour' });
  } catch (error) {
    return res.status(500).json('Server Error');
  }
}

module.exports = { submitOrder, listOrders, deleteOrder, getOrderInfo, updateOrder }