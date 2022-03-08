const mongoose = require('mongoose');

 //const dbURI = 'mongodb://127.0.0.1:27017/Hospital-api';

 const dbURI='mongodb+srv://adev:adev@cluster0.7yy55.mongodb.net/Hospital-api?retryWrites=true&w=majority'
// process.env.db_URI

function connectDb() {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  mongoose.connect(dbURI,
    { useNewUrlParser: true }).then(() => {
      console.log("MongoDB Connected…")
    })
    .catch(err => console.log(err));


  
}

module.exports = connectDb;
