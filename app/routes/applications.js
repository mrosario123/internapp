// app/routes.js
var User = require('../models/user');
var Site = require('../models/site');
var Bio = require('../models/bio');
var Itec = require('../models/itec');

module.exports = function(app, passport) {

    // =====================================
    // APPLICATIONS ========================
    // =====================================
    app.get('/applications', isLoggedIn, function(req, res) {
        if (req.user.role === 'admin' || req.user.role === 'faculty'  ) {
            if (req.user.discipline == 'bio') {
                Bio.find(function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
            else {
                Itec.find(function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
        }
        else {
            if (req.user.discipline == 'bio') {
                Bio.find({
                    email: req.user.email
                }, function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
            else {
                Itec.find({
                    email: req.user.email
                }, function(err, applications) {
                    if (err) return console.error(err);
                    res.render('applications.ejs', {
                        applicationList: applications,
                        user: req.user
                    });
                });
            }
        }
    });
    
            app.get('/application/bio/:applicationid', isLoggedIn, function(req, res) {
          Bio.findOne({ _id: req.params.applicationid },function (err, appdetail) {
  if (err) {
  }
  else{
         res.render('applicationdetails.ejs', {
            application : appdetail,
            user : req.user,
            message : req.flash('info')
        }); 
  }

});
    });
    
                app.get('/application/itec/:applicationid', isLoggedIn, function(req, res) {
          Itec.findOne({ _id: req.params.applicationid },function (err, appdetail) {
  if (err) {
  }
  else{
         res.render('applicationdetails.ejs', {
            application : appdetail,
            user : req.user,
            message : req.flash('info')
        }); 
  }

});
    });

    // =====================================
    // ITEC ================================
    // =====================================
    app.get('/itec', isLoggedIn, function(req, res) {
        res.render('itec.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/itec', isLoggedIn, function(req, res) {
        var itecapp = new Itec(req.body);
        itecapp.email = req.user.email;
        itecapp.applicationstatus = 'submitted';
        itecapp.save(function(err) {
            if (err) return console.error(err);
        });
        res.redirect('/dashboard');
    });

    // =====================================
    // BIO =================================
    // =====================================
    app.get('/bio', isLoggedIn, function(req, res) {
        res.render('bio.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.post('/bio', isLoggedIn, function(req, res) {
        var bioapp = new Bio(req.body);
        bioapp.useremail = req.user.email;
        bioapp.userstudentid = req.user.email;
        bioapp.userfname = req.user.email;
        bioapp.userlname = req.user.email;
        bioapp.useraddress = req.user.email;
        bioapp.usercity = req.user.email;
        bioapp.userstate = req.user.email;
        bioapp.userzipcode = req.user.email;
        bioapp.userdiscipline = req.user.email;
        bioapp.applicationstatus = 'submitted';
        bioapp.save(function(err) {
            if (err) return console.error(err);
        });
        res.redirect('/dashboard');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
