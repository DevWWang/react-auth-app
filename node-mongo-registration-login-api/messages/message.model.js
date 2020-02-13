const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    project: {
        type: String,
        // required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
    	type: String,
    	required: true
    },
    photo: {
    	type: String,
    	// required: true
    },
}, {
	timestamps: true
});

messageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Message', messageSchema);