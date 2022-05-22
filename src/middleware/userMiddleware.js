const jwt = require('jsonwebtoken');

function auth(req,res,next){
  if (req.headers.authorization) {
   const token = req?.headers?.authorization?.split(" ")[1];
    if(!token) res.status(401).send('Access denied, no token provided');

    try {
         const decode = jwt.verify(token,process.env.jwtPrivateKey);
         req.user = decode;
         next();
    } catch (error) {
      res.status(400).send('Invalid Token');
    }
  }
}


exports.userMiddleware = async (req,res,next)=>{
  if(req.user.role != 'user') res.status(401).send('Unauthorized, you are not a user!');
  next();
}

exports.auth = auth;

