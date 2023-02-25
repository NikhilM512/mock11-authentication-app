const express=require("express");
const app=express();

const dotenv=require("dotenv");
const cors=require("cors");
const { AuthRouter, authRouter } = require("./Routes/Auth.route");
const { authenticationMiddleware } = require("./Middleware/authenticationMiddleware");
const { connection } = require("./Config/db");
const { profileRouter } = require("./Routes/Profile.route");

dotenv.config();

const PORT=process.env.PORT || 7007;

app.use(express.json());
app.use(cors({origin:"*"}))

app.get("/",(req,res)=>{
    res.send("Hello, Welcome to Authentication App API")
});

app.use("/auth",authRouter);

app.use(authenticationMiddleware);

app.use("/profile",profileRouter)

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Conneted to DB")
    } catch (error) {
        console.log(error)
    }
   console.log(`Listening to port ${PORT}`);
});


