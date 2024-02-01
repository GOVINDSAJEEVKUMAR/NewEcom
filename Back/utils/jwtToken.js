//create token 

const sendToken =(user,statusCode,res)=>{
    const token = user.getJwtToken();

    //options for cokkies

    const options ={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
    };
    res.status(statusCode).cokkie("token",token,options).json({
        success:true,
        user,
        token,
    });
}

module.exports = sendToken;