const router = require('express').Router();
const {User, Thought} = require('../../Models');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({_id: req.params.thoughtId});
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: thoughtData._id}},
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            req.body,
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({_id: req.params.thoughtId});
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});


router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;