const isAuthenticated =(req,res,next)=>{
    if(req.isAuthenticated())
    {
        return res.status(400).json('You do not have access')
    }
    next();
}

module.exports ={
    isAuthenticated
}