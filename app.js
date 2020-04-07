const express = require("express");
const app = express();
const path = require('path');
const request = require("request");



require('dotenv').config()

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs")

//Configuring static pages
app.use(express.static("./public"))


/**
 *  GET REQUESTS
 * 
 */
app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/result", (req, res)=>{

    //wow req.query is used to pick out the value of any input using GET method
    let query = req.query.name
    
    request("https://api.themoviedb.org/3/search/movie?api_key="+process.env.MOVIE_DB_KEY+"&query="+query, (err, response, body)=>{
        if(err){
            console.log(err);
            res.render("error", {searchQuery: query})
        }else{
            let data = JSON.parse(body);
            res.render("result", {data : data, searchQuery : query})
          }
    })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server running successfuly");
})