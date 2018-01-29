const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	googleName: String,
	googleEmail1 : String
});

//create a new collection called users
mongoose.model('users',userSchema);
