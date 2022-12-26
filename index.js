// import package
import Express  from "express";
import Cors  from "cors";
import dotenv from 'dotenv'; 
import mongoose from "mongoose";
// import Routing
import route from "./Routes/UserRouting.js";

dotenv.config();

try{
    //DB connection

    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error)=> console.error(error));
    db.once('open', () => console.log('Database Connected'));

    //middleware
    const app = Express();
    app.use(Cors());
    app.use(Express.json({limit: '30mb'})); //limit the size of the JSON file
    app.use('/api',route);
    const PORT = process.env.API_PORT || 3000
    app.listen(PORT,()=> console.log('Server Running at',{PORT}));
} catch (error) {
    console.log(error);
}
