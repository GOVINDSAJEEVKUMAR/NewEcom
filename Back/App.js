const  express = require("express")
const cokkieParser = require("cookie-parser")
const ErrorHandler = require("./Middleware/Error")
const bodyParser = require ("body-parser");
const cors = require("cors");


const app= express();
app.use(express.json())
app.use(cokkieParser());
app.use(cors(
    {origin:"http://localhost:5173"}
));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));

//router import

const user = require("./Controller/user")
app.use("/api/v2",user);


//for error handling
app.use(ErrorHandler);
module.exports=app