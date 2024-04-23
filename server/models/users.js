const { Schema, model } = require("mongoose")
const {createHmac, randomBytes} = require('crypto')
const { createToken } = require('../service/authentication');

const userSchema = new Schema({
  fullname:{
    type: String,
    required: [true, "Please provide fullname"]
  },
  email:{
    type: String,
    required: [true, "Please provide email"],
    unique: true
  },
  password:{
    type: String,
    required: [true, "Please provide password"]
  },
  salt:{
    type: String
  },
  gender:{
    type: String
  },
}, {timestamps:true});

userSchema.pre("save", async function(next){
  const user = this

  if(!user.isModified("password")) return;

  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac("sha256", salt)
  .update(user.password)
  .digest('hex')
  this.salt = salt;
  this.password = hashedPassword;
  next();
})

userSchema.static("matchPassword", async function(email, password){
  const user = await this.findOne({email})
  if(!user) throw new Error("User does not exist")
  const salt = user.salt;
  const hashedPassword = user.password;

  const regenerateHashPassword = createHmac("sha256", salt)
  .update(password)
  .digest('hex')

  if(hashedPassword !== regenerateHashPassword) throw new Error("Invalid Password")
  const token = createToken(user);
  return token;
})

module.exports = model("users", userSchema);
