const authorizeUser = require("./socketio/authorizeUser");
const addFriend = require("./socketio/addFriend")
const initializeUser = require("./socketio/initializeUser");
const onDisconnect = require("./socketio/onDisconnect");

module.exports = {
  authorizeUser,
  addFriend,
  initializeUser,
  onDisconnect
}