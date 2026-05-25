require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
const logger = require("./helpers/logger.js")

const app = express();

app.use((req, res, next) => {
  req.logger = logger;
  next();
});

const dbURI = process.env.dbURI
const PORT = process.env.PORT || 8000;

if (!dbURI) {
  logger.warn("dbURI not set. Mongo connection will be skipped.");
}

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true        
} 

mongoose.connect(dbURI, connectionParams)
.then(() => {
    console.log("mongoDB Connected...");
    logger.info("mongoDB Connected...");
    console.log("Connected DB name:", mongoose.connection.name);
})
.catch((err) => {
    logger.error("Error in connecting MongoDb. Failed to start server!!", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.get('/',(req,res)=>{
    res.send("Meta App Working Fine");
});


app.use(express.static('public'))

const initializeApp = (app)=>{
    app.listen(PORT,(error)=>{
        if(!error)
            logger.info(`App is listening on port ${PORT}`)
        else 
            logger.error(`Error occurred, Initialization Failed", ${error}`);
    });
}

initializeApp(app);