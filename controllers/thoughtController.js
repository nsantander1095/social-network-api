// need   getThoughts,
// getSingleThought,
// createThought,
// updateThought,
// deleteThought,
// addReaction,
// removeReaction,

const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id }},
          { runValidators: true, new: true }
        );
      })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'Thought created, but found no user with that ID',})
          : res.json('Created the thought')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate( req.params.thoughtId, req.body, { runValidators: true, new: true })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId})
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with this ID'})
          : User.findOneAndUpdate(
              { thoughts: { _id: req.params.thoughtId }},
              {$pull: { thoughts: {_id: req.params.thoughtId }}},
              { runValidators: true, new: true }
          )
      )
      .then((user) => 
        !user
          ? res.status(404).json({message: 'Thought deleted, but no user with this ID'})
          : res.json({ message: 'Thought deleted successfully'})
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId }}},
      { runValidators: true, new: true }
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'No thought with this ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
};