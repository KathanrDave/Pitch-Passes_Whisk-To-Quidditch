const express=require('express');
require('dotenv').config();
main().catch(err => console.log(err));
const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const User=require('./models/user'); 
const app=express();
app.use(express.json());

app.post("/register",async (req,res) => {
 try{
  const {firstName,lastName,email,password,confirmPassword} = req.body;
  // All the fields are mandatory
  if(!(firstName && lastName && email && password && confirmPassword))
  {
    res.status(400).send('All fields are mandatory');
  }
  // Check if the user already exists
  const existsUser = await User.findOne({email});
  if(existsUser)
  {
  res.status(401).send('User Already Exists');
  }
  // encrypting the password
  const myEncPassword=await bcrypt.hash(password,10)
  // save the user in the Database 
  const user = await User.create({
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:myEncPassword
  })
  // generating a web token
   const token = jwt.sign(
    {id:user._id,email:user._email},process.env.SECRET_KEY,{expiresIn:"2h"}           // helps in generation of the unique id
   );
  //
  user.token=token;

 }
catch(error)
{
    console.log(error);
}
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });