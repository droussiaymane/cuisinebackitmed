const mongoose = require('mongoose');
const PatientModel = require('../models/Patient');
const OrderModel = require('../models/Order');
const ReturnModel = require('../models/Return');

//const { patientSchema } = require('../helpers/patientValidator')

function errorHandling(err) {
  const response = {};

  if (err.code === 11000) {
    response.error = 'Le patient existe déjà';
  }
  if (err.message.includes('Patient validation failed')) {
    const errors = Object.values(err.errors);

    errors.forEach(({ properties }) => {
      response[properties.path] = properties.message;
    });
  }
  return response;
}

async function patientRegister(patientInfo, res) {


 
    
    const {
      fullName, ssNumber, roomNumber, gender,
      birthday, sejourn, service, enterDate, disease, salt, sugar, eggs, milk, seafood, grain, nuts, fruits
      , other

    } = patientInfo;

    const patient = new PatientModel({
      fullName,
      ssNumber,
      roomNumber,
      gender,
      birthday,
      sejourn,
      service,
      enterDate,
      disease,
      foodParticularity: {
        salt,
        sugar,
        allergies: {
          eggs: eggs || false,
          milk: milk || false,
          seafood: seafood || false,
          grain: grain || false,
          nuts: nuts || false,
          fruits: fruits || false,
        },
        other,
      }
    });
    try {
      await patient.save();
      return res.status(200).json({ msg: 'Le patient a été ajouté' });
    } catch (error) {
      const errors = errorHandling(error);
      return res.status(500).json(errors);
    }
  
}

async function listPatients(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) { query = (searchString !== '') ? { $text: { $search: searchString } } : {}; }
  try {
    const documentsNumber = await PatientModel.countDocuments({ active: true });
    const patients = await PatientModel.find({ ...query, active: true })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = patients;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send('Serever Error');
  }
}

// check if the ObjectId is valid
function checkObjectId(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Patient introuvable' });
    return false;
  }
  return true;
}

async function deletePatient(req, res) {
  if (!checkObjectId(req, res)) return 1;
  try {
    await OrderModel.deleteMany({ patientId: req.params.id });
    await ReturnModel.deleteMany({ patientId: req.params.id });

    const patient = await PatientModel.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient introuvable' });
    return res.status(200).json({ msg: 'patient supprimée' });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

async function updatePatient(req, res) {
  if (!checkObjectId(req, res)) return 1;
  const {
    fullName, roomNumber, gender, ssNumber,
    birthday, sejourn, service, enterDate, active, disease, foodParticularity
    , other
  } = req.body;
  try {
    const patient = await PatientModel.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient introuvable' });
    if (fullName) patient.fullName = fullName;
    if (ssNumber) {
      patient.ssNumber = ssNumber;
    }
    if (roomNumber) patient.roomNumber = roomNumber;
    if (gender) patient.gender = gender;
    if (birthday) patient.birthday = birthday;
    if (sejourn) patient.sejourn = sejourn;
    if (service) patient.service = service;
    if (enterDate) patient.enterDate = enterDate;
    if (disease) patient.disease = disease;
    if (active !== undefined) patient.active = active;
    if (foodParticularity) patient.foodParticularity = foodParticularity
    if (other) patient.foodParticularity.other = other;
    await patient.save();
    return res.status(200).json({ msg: 'patient mis à jour' });
  } catch (error) {
    const errors = errorHandling(error);
    return res.status(500).json(errors);
  }
}


async function getPatient(req, res) {

  const { fullName } = req.params

  console.log(fullName)

  PatientModel.findOne({ 'fullName': fullName}, (err, obj) => {
    if (err)
      return res.status(404).json({message: 'patient was not found'})
    else 
      return res.status(200).json(obj)
  })
}


module.exports = {
  patientRegister, listPatients, deletePatient, updatePatient, getPatient
};
