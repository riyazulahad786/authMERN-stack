const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); 
app.use(cors());


mongoose.connect('mongodb+srv://auth:auth@cluster0.mwswlnt.mongodb.net/authUsers',{ 
     useNewUrlParser: true,
    useUnifiedTopology: true,
})


//register
app.post('/api/register', async(req, res) => {
  console.log(req.body);

  try {
    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: 'error' });
  }
 
});
//login
app.post('/api/login', async(req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
   
   
   if(user){
    const token = jwt.sign({
      name:user.name,
      email:user.email
    },'secret12356789')
    
    res.json({ status: 'ok',user:token });   // res.json({ status: 'ok',user:true }); true is updated with token to jwt
   }else{
    res.json({ status: 'error',user:false });
   }


  });




  // Quote retrieval
// app.get('/api/quote', async (req, res) => {
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(401).json({ status: 'error', message: 'Token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });

//     if (user) {
//       res.json({ status: 'ok', quote: user.quote });
//     } else {
//       res.status(401).json({ status: 'error', message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ status: 'error', message: 'Invalid token' });
//   }
// });

// // Update user's quote
// app.post('/api/quote', async (req, res) => {
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(401).json({ status: 'error', message: 'Token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret12356789');
//     const email = decoded.email;
//     await User.updateOne(
//       { email: email },
//       { $set: { quote: req.body.quote } }
//     );
//     res.json({ status: 'ok' });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ status: 'error', message: 'Invalid token' });
//   }
// });
  //qoute
  // app.get('/api/quote', async(req, res) => {
  //   const token = req.headers['x-access-token']
  //   try {
  //     const decoded = jwt.verify(token,'secret12356789')
  //     const email = decoded.email
  //     const user =  await User.findOne({email:email})

  //     return res.json({status:"ok",quote:user.quote})
  //   } catch (error) {
  //     console.log('error')
  //   }
   
   
   

  // });

  // app.post('/api/quote', async(req, res) => {
  //   const token = req.headers['x-access-token']
  //   try {
  //     const decoded = jwt.verify(token,'secret12356789')
  //     const email = decoded.email
  //     await User.updateOne(
  //       {email:email},
  //       {$set:{quote:req.body.quote}}
  //       )

  //     return res.json({status:"ok"})
  //   } catch (error) {
  //     console.log('error')
  //   }
   
   
   

  // });

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
