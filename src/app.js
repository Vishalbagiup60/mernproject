require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
 const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const {json} = require("express");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
//console.log(path.join(__dirname, "../public"));
console.log(process.env.SECRET);

app.get("/", (req, res)=> {
    res.render("index")
    });

app.get("/register", (req, res)=> {
res.render("register")
});

app.get("/login", (req, res)=> {
    res.render("login")
    });

//create a new user in our database
app.post("/register",async (req, res)=> {
        try {
            
            const registerEmployee = new Register ({
                firstname: req.body.firstname,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                password: req.body.password

            })

console.log("the success part" + registerEmployee);


            const token = await registerEmployee.generateAuthToken();
            // console.log("the token part" +token);

            const registered = await registerEmployee.save();
            res.status(201).render("index");

        } catch (error) {
            
            res.status(400).send(error);
            console.log(error);
        }
    });

    app.post("/login",async (req, res)=> {
        try {
            
            const email = req.body.email;
            const password = req.body.password;

          //  console.log(email+" and password is"+password)

            const useremail = await Register.findOne({email:email});

            const isMatch = await bcrypt.compare(password, useremail.password);

            const token = await useremail.generateAuthToken();
           // console.log("the token part" +token);
           
            if(isMatch){
                res.status(201).render("index");
            }else{
                res.send("Invalid Email or Password");
            }
            
        } catch (error) {
            
            res.status(400).send("Invalid Email or Password");
        }
    });   

   
    const bcrypt = require("bcryptjs");
    const securePassword = async (password) =>{

    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);

    const passwordMatch = await bcrypt.compare(password, passwordHash);
    //console.log(passwordMatch);
}

securePassword("vkg@123");
const jwt = require("jsonwebtoken");

const createToken = async() => {
    const token = await jwt.sign({_id:"65e74209937b180629522cf3"}, "mynameisvishalkumarguptaalphabita", {
        expiresIn: "2 seconds"
    });

   // console.log(token);

    const userVer= await jwt.verify(token, "mynameisvishalkumarguptaalphabita");
    //console.log(userVer);
}

createToken();



app.listen(port, ()=>{
    console.log("server is running on port",+port);
})
