const app = require ("./App");
const connectDatabase = require("./DB/Database");


//handling error
process.on('uncaughtException',()=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting Down The Server for the handling uncaught exceception");
});

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"config/.env",
        
    });

}
//connect DB
connectDatabase();

//create server


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is listening on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection

process.on('unhandledRejection',(err)=>{
    console.log(`Shutting Down :${err.message}`);
    console.log("shutting down for rejection");

    server.close(()=>{
        process.exit(1);
    })

})