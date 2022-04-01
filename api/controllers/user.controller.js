const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const { userSchema } = require('../helpers/userValidator')


async function userRegister(userInfo, res) {
  // Validate with Joi first
 
  const { error, value } = userSchema.validate(userInfo)

  console.log(error)
  console.log(value)
  if (error)
    return res.status(400).json({ error })
  else {
	  
    const { fullName, email, password, role } = userInfo;

    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(role);

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const checkEmail = await UserModel.exists({ email });
      if (checkEmail) {
        return res.status(403).json({ msg: "Email existe déjà" });
      }

      const user = new UserModel({
        fullName,
        email,
        role,
        password: hashPassword,
		active: false
      });
      await user.save();

      return res.status(200).json({ msg: "utilisateur ajouté" });
    } catch (error) {
      console.log(error);
      return res.status(500).json("server error");
    }
  }
}

async function listUsers(req, res) {
  const results = {};
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const searchString = req.query.q;
  let query = {};
  if (searchString) {
    query = searchString !== "" ? { $text: { $search: searchString } } : {};
  }

  try {
    const documentsNumber = await UserModel.countDocuments({ ...query });
    const users = await UserModel.find({ ...query })
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    results.total_pages = Math.ceil(documentsNumber / limit);
    results.page = page;
    results.data = users;
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Serever Error");
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });
    return res.status(200).json({ msg: "Utilisateur supprimée" });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
}

async function userLogin(userInfo, res) {
  // Look for user in database without use of jwt

  const { email, password } = userInfo;
  if (!email || !password ){
    return undefined;
  }


    const user = await UserModel.findOne({ email });
console.log(user) 
    if (!user) {
      return undefined;
       
    }
	
    else if (!bcrypt.compareSync(password, user.password)) {
    
      return undefined;
    }
	else if (!user.active) {
    
      return undefined;
    }

    else{
      return user._id;
    }
 

 
}

async function updateUser(req, res) {
  const { fullName, role, email } = req.body;
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });
    const checkEmail = await UserModel.find({ email });
    if (checkEmail.length && user.email !== email) {
      return res.status(403).json({ msg: "Email exist" });
    }
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (role) user.role = role;
    await user.save();
    return res.status(200).json({ msg: "user mis à jour" });
  } catch (error) {
    return res.status(500).json("Server Error");
  }
}

async function activateUser(req, res) {
  const { fullName, role, email } = req.body;
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });
    const checkEmail = await UserModel.find({ email });
    if (checkEmail.length && user.email !== email) {
      return res.status(403).json({ msg: "Email exist" });
    }
    user.active=true
    await user.save();
    return res.status(200).json({ msg: "user mis à jour" });
  } catch (error) {
    return res.status(500).json("Server Error");
  }
}
module.exports = {
  userRegister,
  userLogin,
  listUsers,
  deleteUser,
  activateUser,
  updateUser,
};
