// This middleware checks if the user is signed in or not. If the user is signed in, it will call the next middleware. If the user is not signed in, it will redirect the user to the sign-in page. 
const  isSignedIn = (req, res, next) => { 
    // if the user is signed in, call the next middleware
  if (req.session.user) return  next();  
    // if the user is not signed in, redirect to the sign-in page
    res.redirect('/auth/sign-in');
    // if the user is not signed in, redirect to the sign-in page
}
// export the middleware function
module.exports = isSignedIn; 

