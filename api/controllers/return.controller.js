const mongoose = require('mongoose');
const ReturnModel = require('../models/Return');
const KitchenOrder = require('../models/KitchenOrder')

const { returnSchema } = require('../helpers/returnValidator')


async function addReturn(req, res) {



 
      const {
        kitchenOrder,foodWeight, plasticWeight, cartonPaperWeight, metalWeight,
      } = req.body;
     /* if (!mongoose.isValidObjectId(kitchenOrder))
        return res.status(500).send('Server error');
      const order = await KitchenOrder.findById(kitchenOrder);
      if (!order)
        return res.status(500).send('Server error');
      order.recycled = true;
      order.save()
      */
      const item = new ReturnModel({
        kitchenOrder: kitchenOrder,
        foodWeight,
        plasticWeight,
        cartonPaperWeight,
        metalWeight,
      });
      await item.save();
      return res.status(200).send({ msg: 'retour enregistré' });
    
}
module.exports = {
  addReturn, 
};
