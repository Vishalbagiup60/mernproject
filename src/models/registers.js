const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema =new mongoose.Schema({
    firstname :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique: true
    },
    phone :{
        type:Number,
        required: true,
        unique: true
    },
    gender :{
        type:String,
        required: true
    },

    password :{
       type:String,
        required: true
    },
    tokens:[{
        token:{
        type:String,
        required: true
        }
    }]
    
})

employeeSchema.methods.generateAuthToken = async function(){
try {
    console.log(this._id);
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET);
    this.tokens = this.tokens.concat({token})
    await this.save();
    return token;
} catch (error) {
    //res.send("the error part" +error);
    console.log("the error part" +error);
}
}

// converting password intio hash
employeeSchema.pre("save", async function(next) {

     if(this.isModified("password")){
      //  const passwordHash = await bcrypt.hash(password, 10);
    console.log('the current password is' +this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('the current password is' +this.password);
     }
    
    next();
}
)
// now we need to create a collections

const Register =  new mongoose.model("Register", employeeSchema);
module.exports = Register;