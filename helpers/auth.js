/* 
    Restricting Routes
*/
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } 
        return res.redirect('/'); // redirect to welcome page
    },
    // if user logged in => redirect to dashboard if the tend to get to welcome page
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            return res.redirect('/dashboard'); 
        } else {
            return next();
        }
    }
}