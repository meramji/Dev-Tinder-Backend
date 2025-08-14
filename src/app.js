const express=require("express"); //importing express

const app=express();  //the server has been made.
app.use("/hello",(req,res) =>{
    res.send("helo sb badhiya");
});

app.use("/tst",(req,res) =>{
    res.send("hello fom the server.");
});

app.listen(3000,() =>{
    console.log("the server is sucessfully listening.")
});  //server is listening at port 3000.