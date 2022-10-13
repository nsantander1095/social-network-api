// need   getUsers,
//   getSingleUser,
//   createUser,
//   updateUser,
//   deleteUser,
//   addFriend,
//   removeFriend,

const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findByIdAndUpdate( req.params.userId, req.body, { new: true })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findByIdAndUpdate( 
      req.params.userId, 
      { $addToSet: { friends: { friendId: req.params.friendId }}},
      { new: true }
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user found with this ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findByIdAndUpdate( 
      req.params.userId, 
      { $pull: { friends: { friendId: req.params.friendId }}},
      { new: true }
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user found with this ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};