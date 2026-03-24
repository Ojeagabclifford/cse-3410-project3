const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;


const getDirectors = async (req, res) => {
  const db = mongodb.getDb();
  
  try {
    // await tells Node to wait for the data before moving to the next line
    const lists = await db.collection('directors').find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    // This catches errors that the callback method would miss
    res.status(500).json({ message: "Database Error", error: err.message });
  }
};



//director 
// name
// "Christopher Nolan"
// bio
// "British-American filmmaker."
// nationality
// "British"

// awards
// Array (1)

const createDirector = async (req, res) => {

    const db = mongodb.getDb();
    // contact: firstName, lastName, email, favoriteColor, and birthday.
    const newDirector = {
      name: req.body.email,
      bio: req.body.bio,
      nationality: req.body.nationality,
      awards: req.body.awards
    };
    const response = await db.collection('directors').insertOne(newDirector);
    if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the director.');
  }

}

const updateDirector = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid director id to update a director.');
  }
   const userId = new ObjectId(req.params.id);
 
    const updatedDirector = {
      name: req.body.name,
      bio: req.body.bio,
      nationality: req.body.nationality,
      awards: req.body.awards
    };
    const response = await mongodb.getDb().collection('directors').replaceOne({ _id: userId },  updatedDirector);
   if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the director.');
  }
}

const deleteDirector = async (req, res) => {
 if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid director id to delete a director.');
  }
    const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb()
  
  .collection('directors').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the director.');
  }}

module.exports = {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector
};