const { User } = require('../../model/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');


  exports.signin = async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

     const validPass = await bcrypt.compare(req.body.password, user.password);

     if(!validPass) return res.status(400).send('Invalid Password');

     if(user.role != 'user') res.status(403).send('Access denied, you are not a user!');

       const { id,fullName, username, email,role }= user;
       const token = user.generateAuthToken();
       
       res.send({token, user:{ id,fullName,username,email,role } });


}

function validate(user){
  const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().required()
  }
  return Joi.validate(user,schema);
}