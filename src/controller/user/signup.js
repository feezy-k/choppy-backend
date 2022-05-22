const bcrypt = require('bcrypt');
const { User,validate} = require('../../model/user');
const _ = require('lodash');
const shortid = require('shortid');


exports.signup = async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('email already registered.');
       
       user = new User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         username: shortid.generate(),
         password: req.body.password,
       });

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(user.password, salt);

       await user.save();
       const token = user.generateAuthToken();
       res.header('x-auth-token', token).send(_.pick(user,['_id','firstName','lastName','username','email','role']));
};

