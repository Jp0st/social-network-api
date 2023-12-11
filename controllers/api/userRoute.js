const router = require('express').Router();
const {User, Thought} = require('../../Models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.find();
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const userData = await User.findOne({_id: req.params.userId});
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            req.body,
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({_id: req.params.userId});
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        );
        res.status(200).json(thoughtData);
    }catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;