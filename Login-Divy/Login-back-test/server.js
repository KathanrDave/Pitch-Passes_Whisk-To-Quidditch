const express=require('express');
require('dotenv').config();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const app=express();
app.use(express.json());


app.get("/",(req, res) => {
    res.send("Hello World!");
})

app.post("/register",async (req,res) => {
 try{

 }
catch(error)
{
    console.log(error);
}
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });