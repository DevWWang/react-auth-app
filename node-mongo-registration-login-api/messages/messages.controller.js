const express = require('express');
const router = express.Router();
const messageService = require('./message.service');

// routes
router.post('/send', create);
router.get('/:project', getAllByProject);
router.get('/:id', getById);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    messageService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByProject(req, res, next) {
    messageService.getAllByProject()
        .then(messages => res.json(messages))
        .catch(err => next(err));
}

function getById(req, res, next) {
    messageService.getById(req.params.id)
        .then(message => message ? res.json(message) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    messageService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}