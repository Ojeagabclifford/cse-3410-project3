const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId; // Cleaner way to pull it out



const getMovies = async (req, res) => {
 
  try {
    const db = mongodb.getDb();
    
    
    const movies = await db.collection('movies').find().toArray();

    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);

  } catch (err) {
  
    console.error("Database Error:", err);
    res.status(500).json({ 
      message: "An error occurred while fetching movies", 
      error: err.message 
    });
  }
};

const getOneMovie = async (reg,res) =>{
  
  
  try {
    if (!ObjectId.isValid(reg.params.id)){
      res.status(404).json("This must be a vaild movie id for you to get the id")}

    const db = await mongodb.getDb()
     
    const movieId =  new ObjectId(reg.params.id);
    // console.log(movieId);
    const response = await db.collection('movies').findOne(movieId)
    
    // console.log(json(response));
    if(!response)
    {
      return res.status(404).json({error:"This movie is not found"})
      
    }
    res.json(response)
      
  } catch (error) {

    console.error(error);

    res.status(505).json({message:"This is a server a error.",
       error: err.message 
    })
    
  }
 

}
//data
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
try {
  

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
   catch (error) {
    console.log(error)
    res.status(500).json({message:"This is a server a error",
       error: err.message })
    
  
}}


const updateMovie = async (req, res) => {
    
    try{

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
  }}
  catch (error) {
    console.log(error)
    res.status(500).json({message:"This is a server a error",
       error: err.message })
    
  
}
}

const deleteMovie = async (req, res) => {
  try{

  
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
     catch (error) {
    console.log(error)
    res.status(500).json({message:"This is a server a error",
       error: err.message })
    
  
}}

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getOneMovie
};
