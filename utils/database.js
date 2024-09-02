import mongoose from "mongoose";
let isConnected = false; //track the connection

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MongoDB is already connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName :"share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })

        isConnected = true;
    
    } catch (error) {
        console.log(error);
    }
}

/*
we can export an async funciton to 
inside here we can make db connetion

this simply set mongoose options 

if connected 

if we aren't connected we can open up a new try and catch block
and we can try to established new db connection

by mongoose.connect()
pass reuquied : uri, option object


Ofcourse we don't yet have the MONGODD_URI or the database
we want to connect to, to be able to save those users
so what we can do  is head to the mongodb atlas

which is an online cloud storage to create your database So let's do that right away

you can head to mongod.com/atlas
*/
