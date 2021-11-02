//require('dotenv').config()
const express = require('express'),
    app = express();
// bodyParser = require('body-parser'),
// mongoose = require('mongoose'),
// fileUpload = require('express-fileupload');

// main().catch(err => console.log(err));
// async function main() {
//       await mongoose.connect(`mongodb://localhost:27017/${process.env.db_name}`,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: true
//     });
// }

// app.use(bodyParser.json());
// app.use(fileUpload());


// const userRouter=require('./routes/user');

// app.use('/users',userRouter);

module.exports = app;