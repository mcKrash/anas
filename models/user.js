const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        maxlength:200,
        default: 'Null'
    },
    password: {
        type: String,
        required: true,
        maxlength: 150
    },
    pic: {
        type: String,
        default:'image.jpg'
    },
    token: {
        type: String,
        maxlength: 250,
        default: 'Null'
    },
    firebase_token: {
        type: String,
        maxlength: 250,
        default: 'Null'
    },
},
{timestamps: true}
);

userSchema.methods.validPassword = function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
}

//Generating Token For This User
userSchema.methods.getJWT = function() {
    return JWT.sign({ userId: this._id }, jwtSecret)
}




module.exports = mongoose.model('User', userSchema);