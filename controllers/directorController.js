const mongodb = require('../config/db');
const ObjectId = require('mongodb').ObjectId;


const getDirectors = async (req, res) => {
  
  
  try {
    const db = mongodb.getDb();
    const lists = await db.collection('directors').find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
  
    res.status(500).json({ message: "Database Error", error: err.message });
  }
};


const getOneDirector = async (reg,res) =>{
  if (!ObjectId.isValid(reg.params.id)){
      res.status(404).json("This must be a vaild director id for you to get the id")}
  
  try {

    const db = await mongodb.getDb()
     
    const directorId =  new ObjectId(reg.params.id);
    console.log(directorId);
    const response = await db.collection('directors').findOne( directorId)
    
    console.log(response);
    if(!response)
    {
      return res.status(404).json({error:"that user is not found"})
      
    }
    res.json(response)
      
  } catch (error) {

    res.status(505).json({message:"This is a server a error"})
    
  }
 

}
 
    
  




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
  try{

  
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
  }}
  catch (error){
    console.error(error);

    res.status(505).json({message:"This is a server a error",
       error: err.message 
    })
  }
  

}

const updateDirector = async (req, res) => {
  try{

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
  catch (error){
    console.error(error);

    res.status(505).json({message:"This is a server a error",
       error: err.message 
    })
  }
}

const deleteDirector = async (req, res) => {
  try{

 
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
  }

}
  catch (error){
    console.error(error);

    res.status(505).json({message:"This is a server a error",
       error: err.message 
    })
  }}

module.exports = {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
  getOneDirector
};