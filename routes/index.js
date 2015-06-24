var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {

  res.send('Bienvenido a Node JS');
});
router.get('/about', function(req, res) {

  res.send('Esto es about :D');
});

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

var api = router.route('/user');

//show the CRUD interface | GET
api.get(function(req, res, next) {

  req.getConnection(function(err, conn) {

    if (err) {
      return next('Cannot Connect');
    }
    var query = conn.query('SELECT * FROM t_user', function(err, rows) {

      if (err) {
        console.log(err);
        return next('Mysql error, check your query');
      }

      res.render('user', {title:'RESTful Crud Example', data:rows});

    });

  });

});
//post data to DB | POST
api.post(function(req, res, next) {

  //validation
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();
  req.assert('password', 'Enter a password 6 - 20').len(6, 20);

  var errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
    return;
  }

  //get data
  var data = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  };

  //inserting into mysql
  req.getConnection(function(err, conn) {

    if (err) {
      return next('Cannot Connect');
    }
    var query = conn.query('INSERT INTO t_user set ? ', data,
      function(err, rows) {

        if (err) {
          console.log(err);
          return next('Mysql error, check your query');
        }

        res.sendStatus(200);

      });

  });

});
//now for Single route (GET,DELETE,PUT)
var apiSingle = router.route('/user/:userId');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /apiSingle/user/:userId it hit.

remove apiSingle.all() if you dont want it
------------------------------------------------------*/
apiSingle.all(function(req, res, next) {
  console.log('You need to smth about apiSingle Route ? Do it here');
  console.log(req.params);
  next();
});

//get data to update
apiSingle.get(function(req, res, next) {

  var userId = req.params.userId;

  req.getConnection(function(err, conn) {

    if (err) {
      return next('Cannot Connect');
    }
    var query = conn.query('SELECT * FROM t_user WHERE userId = ? ', [userId],
      function(err, rows) {

        if (err) {
          console.log(err);
          return next('Mysql error, check your query');
        }

        //if user not found
        if (rows.length < 1) {
          return res.send('User Not found');
        }

        res.render('edit', {title:'Edit user', data:rows});
      });

  });

});

//update data
apiSingle.put(function(req, res, next) {
  var userId = req.params.userId;

  //validation
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();
  req.assert('password', 'Enter a password 6 - 20').len(6, 20);

  var errors = req.validationErrors();
  if (errors) {
    res.status(422).json(errors);
    return;
  }

  //get data
  var data = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  };

  //inserting into mysql
  req.getConnection(function(err, conn) {

    if (err) {
      return next('Cannot Connect');
    }
    var query = conn.query('UPDATE t_user set ? WHERE userId = ? ',
      [data, userId],
      function(err, rows) {

        if (err) {
          console.log(err);
          return next('Mysql error, check your query');
        }

        res.sendStatus(200);

      });

  });

});

//delete data
apiSingle.delete(function(req, res, next) {

  var userId = req.params.userId;

  req.getConnection(function(err, conn) {

    if (err) {
      return next('Cannot Connect');
    }
    var query = conn.query('DELETE FROM t_user  WHERE userId = ? ', [userId],
      function(err, rows) {

        if (err) {
          console.log(err);
          return next('Mysql error, check your query');
        }

        res.sendStatus(200);

      });
    //console.log(query.sql);

  });
});

//this line is the Master
module.exports.router = router;
