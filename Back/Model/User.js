const mongoose = require ("mongoose");

const bcrypt = require("bcrypt");

const jwt =require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[4,"password should br greater than 4 character"],
        select:false,
    },
    phone:{
        type:Number,
       
    },
    address:[{
        country:{
            type:String,
        },
        city:{
            type:String,
        },
        address1:{
            type:String,
        },
        address2:{
            type:String,
        },
        zipcode:{
            type:String,
        },
        addressType:{
            type:String,
        },
    }
],
role:{
    type:String,
    default:"user"

},
avatar:{
    public_id:{
        type:String,
        required:false,
    },
    url:{
        type:String,
        required:false,
    },
},
createdAt:{
    type:String,
    default:Date.now(),
},
 resetPasswordToken:String,
 resetPAsswordTime:Date,


});

//Hash Password

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.nextTick.JWT_EXPIRES,
    });
};

//comapre password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword);
}

module.exports = mongoose.model("User",userSchema);