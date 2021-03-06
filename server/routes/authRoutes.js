const passport = require('passport');


module.exports = app => {
	app.get(
	  "/auth/google",
	  passport.authenticate("google", {
	    scope: ["profile", "email"]
	  })
	);

	app.get(
		"/auth/google/callback", 
		passport.authenticate("google"),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout',(req,res) => {
		//this is kill the cookie
		req.logout();
		res.redirect('/');
		console.log(res.send(req.user));
		
	});

	app.get('/api/current_user',(req,res) => {
		res.send(req.user);
	});
};