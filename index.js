import express from 'express'
import mysql from 'mysql'

const app = express()
const port = 8800

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test",
})

///// routes
// 

app.use(express.json())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "select * from books"
    db.query(q, (err,data)=>{
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [values], (err,data) => {
        if (err) return res.json(err)
        return res.json("Book has been created successfully")
    })
})


app.listen(port, ()=> console.log(`Listen on port : ${port}`))