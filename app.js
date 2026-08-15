import express from 'express'
import {engine} from 'express-handlebars'
import pool from './db.js'

const app = express()
const port = 3003

app.engine('handlebars', engine({
    helpers:{
        eq:(a,b) => a === b
    }
}))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

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

// finance logic
app.get("/finance", async (req,res) =>{
    const sql = "SELECT SUM(CASE WHEN transaction_type = 'income' THEN money ELSE 0 END) as total_income, SUM(CASE WHEN transaction_type = 'outcome' THEN money ELSE 0 END) AS total_outcome FROM finances"
    const financeHistory = `
        SELECT
            transaction_name,
            money,
            transaction_type,
            DATE_FORMAT(created_at, '%d-%m-%Y %H:%i') AS date
        FROM finances 
        ORDER BY id DESC;
    `
    const [[rows], [historyRows]] = await Promise.all([
        pool.query(sql),
        pool.query(financeHistory)
    ])

    const totalIncome = rows[0].total_income || 0
    const totalOutcome = rows[0].total_outcome || 0
    const balance = totalIncome - totalOutcome
    res.render("finance", {
        title:"Finance",
        income:totalIncome,
        outcome:totalOutcome,
        balance: balance,
        transaction: historyRows
    })
})

app.post("/finance/store", async(req,res) =>{
    try{
        const {transaction_name, money, transaction_type} = req.body
        if(!transaction_name || !money || !transaction_type){
            return res.status(400).send("Please fill all the fields")
        }

        const sql = "INSERT INTO finances (transaction_name, money, transaction_type) VALUES(?,?,?)"
        const values = [transaction_name, money, transaction_type]

        await pool.query(sql,values)

        res.redirect("/finance")
    }catch(err){
        console.log("Finance Store error ",err)
    }
})


// database connection test 
app.get("/db-test", async(req,res)=>{
    try{
        const [rows] = await pool.query("SELECT 1 AS ok")
        res.json({
            success:true,
            data:rows
        })
    }catch(err){
        console.log("Database Error:",err)
        res.send(err).json({
            success:false,
            error:err.code,
            message:err.message
        })
    }
})

app.listen(port, ()=>{
    console.log(`Server run on http://localhost:${port}`)
})