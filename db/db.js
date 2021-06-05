const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true})
    .then(()=>console.log(`MongoDB Atlas  connected`))
    .catch((error) => console.log(error.message));

}
module.exports = connectDB;
