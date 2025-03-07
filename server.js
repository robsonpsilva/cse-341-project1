const express = require("express");
const app = express();

const mongodb = require("./data/database");

const port = process.env.PORT || 8000;

app.use("/", require("./routes"));


mongodb.initDb((err) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(port, () =>{console.log(`Database and Node running on port ${port}`)});
    }
})