const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
    	type: String,
    	unique: true,
    	required: true,
    	match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    hash: {
    	type: String,
    	required: true
    },
    firstName: {
    	type: String,
    	required: true
    },
    lastName: {
    	type: String,
    	required: true
    },
}, {
	timestamps: true
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);