"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

//in this case we are using the browser capabilites so we do have to use client directive

/* we are one step closer to implementing 
authentication but next auth doesn't just
use the front-end files within the app for 
authentication it uses the next.js API backend points
as well

So immediately this is going to amazing opportunity
to dive into the api folder within the app so let's 
create a new folder called api and within it we can
create a new folder called auth and within that folder 
add [...next/auth]
and within create file route.js

so it's an API route with an API auth Dynamic next auth
and then we have the route
within here we can setup our providers
such as Google Authentication as I said a wonderful
opportunity to dive head first into the use of
next.js API route or back-end endpoints alongside using the for
front-end side

Next.js allows you to do both bear with me we can have this
setup in no time
*/
