
const express = require('express'),
    app = express(),
    routes = require('./routes/routes'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
// fileUpload = require('express-fileupload');
mongoose.Promise = global.Promise;
main().catch(err => console.log(err));
async function main() {
    if (process.env.NODE_ENV !== 'test') {
        await mongoose.connect(`mongodb://localhost:27017/muber`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
app.use(bodyParser.json());
// app.use(fileUpload());

routes(app)
app.use((err, req, res, next) => {
    res.status(422).send({ error: err._message })

})
// const userRouter=require('./routes/user');
// app.use('/users',userRouter);

module.exports = app;