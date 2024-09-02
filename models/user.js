import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// const User = model("User",UserSchema)

const User = models.User || model("User", UserSchema);
export default User;

/*
Inside of this file we can import a Schema a models as wells as models
that's gonna come from mongoose which is help us interating with mongo database


So let's go ahead and create Schema

Now usually if we're working with a regular express backend
we would say something like :: const User = model("User",UserSchema)

we would do this if we're working with regular always on 
always running backend server but in Next.js it's a bit
different

we said that the route is only going to be created and running
for the time when it is getting called so we have to make one check here


******************
The "models" object is provided by the Mongoose library
and stores all the registered models.

If a model named "User" already exits in the "models" object,
it assigns that existing model to the "User" variable.
This prevents redefining the model and ensures
that the existing model is reused. 

If a model name "User" doesn't exist in the "models" object, the 
"model" function from Mongoose is called to create
 a new model

 The newly created model is then assigned to the "User" variable.
******************


That's because this routes get called every time in 
the connection is established every single time
form scratch So we have to make this addtional check :
 ---> [ models.User ]

 Great, now we have the model for our user and we can
 go back to our route.js 

*/
