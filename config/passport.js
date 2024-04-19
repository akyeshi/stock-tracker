/* 

• passport: 
- most popular authentication framework for express app to authenticate client/user request 
- when a request is sent from an authenticated user, Passport's middleware automatically add a 'user' property to the 'req' object
- if a user is not logged in, 'req.user' will be 'undefined'
- no need to retrived 'user' documents from DB in controller actions, because, 'req.user' is already the document. 
- Passport will use the session, which is an in-memory data-store by default, to store a nugget of information that will allow us to lookup the user in the database.

• session: 
- sessions are a server-side way of remembering a user’s browser session
- Sessions remembers the browser session by setting a cookie that contains a session id. 
- No other data is stored in the cookie, just the id of the session.
- On the server-side, your application can optionally store data pertaining to the user’s session (req.session)
- sessions are maintained in memory by default, if the server restarts, session data will be lost. You will see this happen when nodemon restarts the server and you are no longer logged in.

*/

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy; // class variable
const User = require("../models/user");

passport.use(
  // GoogleStrategy class constructor function
  new GoogleStrategy(
    {
      // configuration object
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE.CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },

    async function (accessToken, refershToken, profile, cb) {
      // a user has logged in with OAuth
      // in user schema, we have added all google profile object properties to user schema
      try {
        let user = await User.findOne({ googleId: profile.id });
        // existing user found, provide it to passport
        if (user) return cb(null, user);
        // we have a new user via OAuth
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// After the verify callback function returns the user document, passport calls the passport.serializeUser() method’s callback passing that same user document as an argument.
// It is the job of that callback function to return the nugget of data that passport is going to add to the session used to track the user
passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

// The passport.deserializeUser() method’s callback function is called every time a request comes in from an existing logged in user.
// The callback needs to return what we want passport to assign to the req.user object.
passport.deserializeUser(async function (userId, cb) {
  cb(null, await User.findById(userId));
});
