const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASSWORD}@${process.env.MHOST}:${process.env.MPORT}/${process.env.MDATABASE}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  } catch (e) {
    console.trace(e);
  }
})();


const Questions = require('./models/Questions.js');
const Reviews = require('./models/Reviews.js');
const Users = require('./models/Users.js');


module.exports = {
  Questions,
  Reviews,
  Users,
};
