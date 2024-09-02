import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/*Now to handle our authentication we can create a handler 

*/
// consoleLog({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        //check if user is already existed
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

/*
NextAuth which we call as function
and then provid option objects

finally we'll have to have some funcitons so
next to this array or below it we're going to have
an async session


To get the credential let's go to google console
and get the required keys and ids.

 Now Let's focus on the creating the session and 
 signIn fucntions :

 To be able to get the user session we ofcourse have to sign
 the user in
 so what we can do is create try and catch block

 NOW KEEP IN MIND
 EVERY NEXTJS ROUTE IS SOMETHING KNOWN AS 
 SERVERLESS ROUTE
 which means this is a lamda funciton 
 that opens up only when its get called
 so every time it is called we need to spin up the 
 sever and make a connection to database 
 i.e is great so we don't have to keep our server running
 constantly but we do have to actually make a connection to the database
 for that reason

 we are going to go our utils and within there create
 a new file called database.js

 which we're gonna use to connect or hook it up to database

 serverless --> Lamda -> dynamodb


 Since we don't already have any user, we'll have to create a 
 function to create one and added to the database that we just connected to

 So to be able to do that, we first need to create something called
 model based on which the document of the user will be
 created

 SO that's gonna happen in model's directory inside of which we
 can create new file called user.js

 SO now we have the signin function which automatically
 also creates new a user in database


 Finally we want to be able to get the data about that
 user every single time to keep an existing and running
 session so what we can do is say const


So we're update it (id) making sure that we always know
which user is currently online and with that we're done
with route that's gonna handle our enitre authetication 
process.
  


If  your are still unsure of why we did specific things
in the way we did such as creating this handler,
next Auth importing this thing and exporting them 
in the way we did.

Definetly to check NextAuth.js official documentation


on production we need some env variables to work properly


*****************************
SignIn button click google login page open

again whenever using a framework the difference between the framework and library is the framework
makes thing alot easier for you but you have to follow its rules,So it's important to know what you're
doing by readig the documentation of these great tools that are our diposal now if we go back and try to 
sign in  now it works 


*****************************
 */
