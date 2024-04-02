const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/vkgregistration", {
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
    //useCreateIndex:true
}).then(()=>{
console.log("connection successful");
}).catch((e)=> {
    console.log("Connection failed");
})