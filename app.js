import express from 'express'
import {engine} from 'express-handlebars'

const app = express()
const port = 3003

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get("/", (req,res) =>{
    res.render("index", {
        title:"Home",
        author : "mariodenny"
    })
})

app.get("/profile", (req,res) =>{
    res.render("profile",{
        title:"Profile"
    })
})

app.get("/about", (req,res) =>{
    res.render("about", {
        message : "This is my website on express and handlebars!. check it out",
        title:"About"
    })
})

app.listen(port, ()=>{
    console.log(`Server run on http://localhost:${port}`)
})