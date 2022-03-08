const mongoose = require('mongoose');
const UserModel = require('../models/Users')
const PatientModel = require('../models/Patient')
const KitchenOrderModel = require('../models/KitchenOrder')
async function getUsersStatistics(req, res) {
  let data = []
  try {
    data.push(await UserModel.countDocuments({role:'Admin'}))
    data.push(await UserModel.countDocuments({role:'Aide soignant'}))
    data.push(await UserModel.countDocuments({role:'Agent restauration'}))
    data.push(await UserModel.countDocuments({role:'Responsable approvisionnement'}))
    return res.status(200).json({ data });
    
  } catch (error) {
    return res.status(500).json('server error');
    
  }
}

async function getServiceStatistics(req, res) {
  let data = []
  try {
    data.push(await PatientModel.countDocuments({ service: 'ORL' }))
    data.push(await PatientModel.countDocuments({ service: 'Cardiologie' }))
    data.push(await PatientModel.countDocuments({ service: 'Endocrinologie' }))
    data.push(await PatientModel.countDocuments({ service: 'Gastroentérologie' }))
    data.push(await PatientModel.countDocuments({ service: 'Neurologie' }))
    data.push(await PatientModel.countDocuments({ service: 'Urgences' }))
    data.push(await PatientModel.countDocuments({ service: 'Réanimation' }))
    
    return res.status(200).json({ data });
    
  } catch (error) {
    return res.status(500).json('server error');
    
  }
}

async function getMealsStatistics(req, res) {
  let data = []
  try {
    data.push(await KitchenOrderModel.countDocuments({ status: 'Lancement' }))
    data.push(await KitchenOrderModel.countDocuments({status:'Préparation'}))
    data.push(await KitchenOrderModel.countDocuments({status:'Distribution'}))
    data.push(await KitchenOrderModel.countDocuments({status:'Servi'}))
    

    return res.status(200).json({ data });
    
  } catch (error) {
    return res.status(500).json('server error');
    
  }
}
module.exports = {getUsersStatistics, getServiceStatistics, getMealsStatistics}