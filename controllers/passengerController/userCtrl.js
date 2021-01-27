const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../../models/user');





exports.register = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message: 'Validation Error',
            errors: errors.array()
        });
    }
    try {
        const salt = bcrypt.genSaltSync(15);
        const password = req.body.password;
        const user = new User({
        name:  req.body.name,
        phone:  req.body.phone,
        password: bcrypt.hashSync(password, salt),
        email:  req.body.email,
        pic:  req.body.pic,
    });
    await user.save().then(result => {
        return res.status(201).json(user);
    }).catch(err => {
        if(err.name === 'MongoError' && err.code === 11000){
            field = Object.keys(err.keyValue)[0];
            let response = {
                message: `${field} is already exists, field: field`
            }
            console.log(err);
            return res.status(422).json(response);
        }
    })
    next();
    } catch (error) {
      console.log(error);
      return res.status(499).json({message: 'Opps!, Somthing Went Wrong'});  
    }   
}

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message: 'Validation Error',
            errors: errors.array()
        });
    }

    try {
        const user = await User.findOne({phone:req.body.phone});
        if(!user) return res.status(401).json({message:"Invalid Phone Number"});

        if(!user.validPassword(req.body.password)) {
            return res.status(401).json({message: "Invalid Password"});
        }
        const token = user.getJWT();
        return  res.status(200).json({data: { user, token }});
    } catch (err) {
        console.log(err)
        if(err) return  res.status(401).json({message:  err.message});
        next(); 
    }
}
