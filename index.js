import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT;


// Global Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, //Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message:"Too many request from this IP, please try later"
});

//security middleware
app.use(helmet()) //multiple attack prevnetions refer npm 
app.use(hpp()) //http parameter pollusion prevention
app.use(mongoSanitize()) //sanitize data going to db
app.use("/api",limiter) // ratelimiting api routes


// logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} //only work in development stage 


app.use(express.json({ limit: '10kb' })) //for supporting json - 10 kb file is mostly enough if not extend to 15 or 16
app.use(express.urlencoded({ extended: true, limit: "10kb" })) // for supporting url parameters like query here also limit 10kb is fine
app.use(cookieParser())

//global error handling

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(err.status || 500).json({
        status:'error',
        message:err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV==='development' && {stack:err.stack})
    })
})

app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:3000",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","PATCH","HEAD","OPTIONS"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Allow-Origin",
        "device-remember-token"
    ]
}))
