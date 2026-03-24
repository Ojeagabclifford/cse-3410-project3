const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // Cleaner way to pull it out



const getMovies = async (req, res) => {
 
  try {
    const db = mongodb.getDb();
    
    // 2. Use 'await' to wait for the data. This replaces the callback.
    const movies = await db.collection('movies').find().toArray();

    // 3. Send the successful response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);

  } catch (err) {
    // 4. The 'catch' block grabs any errors that happen above
    console.error("Database Error:", err);
    res.status(500).json({ 
      message: "An error occurred while fetching movies", 
      error: err.message 
    });
  }
};

{
//   "_id": {
//     "$oid": "69c0f882ea921a322f8dd45c"
//   },
//   "title": "Inception",
//   "releaseYear": 2010,
//   "genre": [
//     "Sci-Fi",
//     "Action",
//     "Adventure"
//   ],
//   "directorName": "Christopher Nolan",
//   "castNames": [
//     "Leonardo DiCaprio",
//     "Joseph Gordon-Levitt",
//     "Elliot Page"
//   ],
//   "runtime": 148,
//   "plotSummary": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
// }

const createMovie = async (req, res) => {
 const db = mongodb.getDb();
    const newMovie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      directorName: req.body.directorName,
      castNames: req.body.castNames,
      runtime: req.body.runtime,
      plotSummary: req.body.plotSummary
    };
    const response = await db.collection('movies').insertOne(newMovie);
    if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the movie.');
  }
}


const updateMovie = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to update a movie.');
    }
    const userId = new ObjectId(req.params.id);
    const updatedMovie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      directorName: req.body.directorName,
      castNames: req.body.castNames,
      runtime: req.body.runtime,
      plotSummary: req.body.plotSummary
    };
 const response = await mongodb.getDb().collection('movies').replaceOne({ _id: userId },  updatedMovie);
   if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
}

const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to delete a movie.');
    }
   const userId = new ObjectId(req.params.id);
     const response = await mongodb.getDb().collection('movies').deleteOne({ _id: userId }, true);
     console.log(response);
     if (response.deletedCount > 0) {
       res.status(204).send();
     } else {
       res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
     }}

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
};
};