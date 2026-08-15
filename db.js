import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    port:Number(process.env.MYSQL_PORT),
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0,
    connectTimeout: 10000,
    ssl:{
        ca: fs.readdirSync(
        path.join(process.cwd(), 'ca.pem')  
        ),
        rejectUnauthorized:true,
    }
})

export default pool
