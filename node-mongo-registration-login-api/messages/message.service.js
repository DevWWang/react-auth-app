const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Message = db.Message;

module.exports = {
    create,
    getAllByProject,
    getById,
    delete: _delete
};

async function create(messageParam) {
    const message = new Message(messageParam);

    // save message
    await message.save();
}

async function getAllByProject() {
    return await Message.find().populate('user').select('user message createdAt');
}

async function getById(id) {
    return await Message.find(id).select('-hash');
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}