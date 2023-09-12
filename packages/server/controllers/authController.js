const pool = require("../db");
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid")

module.exports.handleLogin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({
      loggedIn: false,
    });
  }
};

module.exports.LoginAttempt = async (req, res) => {
  const checkUserExists = await pool.query(
    "SELECT id,username,passhash,userid FROM users u WHERE u.username=$1",
    [req.body.username]
  );

  if (checkUserExists.rowCount > 0) {
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      checkUserExists.rows[0].passhash
    );
    if (isSamePassword) {
      //Login
      req.session.user = {
        username: req.body.username,
        id: checkUserExists.rows[0].id,
        userid: checkUserExists.rows[0].userid
      };
      res.json({
        loggedIn: true,
        username: req.body.username,
      });
    } else {
      console.log("Not found");
      res.json({
        loggedIn: false,
        status: "Wrong username or password",
      });
    }
  } else {
    console.log("Not found");
    res.json({
      loggedIn: false,
      status: "Wrong username or password",
    });
  }
};

module.exports.RegisterAttempt = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash, userid) values ($1,$2,$3) RETURNING id, username, userid",
      [req.body.username, hashedPass, uuidv4()]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
      userid: newUserQuery.rows[0].userid
    };
    res.json({
      loggedIn: true,
      username: req.body.username,
    });
  } else {
    res.json({
      loggedIn: false,
      status: "Username already exists",
    });
  }
};
