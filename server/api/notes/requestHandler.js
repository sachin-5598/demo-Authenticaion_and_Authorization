const db = require('../../db/connection');
const notes = db.get('notes');
notes.createIndex('user_id');

async function getAllByUser(req, res, next) {
  const retrievedNotes = await notes.find({
    user_id: req.user._id,
  });
  res.json(retrievedNotes);
}

async function createNewNote(req, res, next) {
  const newNote = {
    ...req.body,
    user_id: req.user._id,
  };
  const insertedNote = await notes.insert(newNote);
  if (insertedNote) {
    res.json(insertedNote);
  } else {
    next(new Error('Something went wrong!!!Try Again.'));
  }
}

module.exports = {
  getAllByUser,
  createNewNote,
};