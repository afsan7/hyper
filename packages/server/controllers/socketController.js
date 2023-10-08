const authorizeUser = require("./socketio/authorizeUser");
const addFriend = require("./socketio/addFriend");
const initializeUser = require("./socketio/initializeUser");
const onDisconnect = require("./socketio/onDisconnect");
const parseFriendsList = require("./socketio/parseFriendsList");

module.exports = {
  authorizeUser,
  addFriend,
  initializeUser,
  onDisconnect,
  parseFriendsList,
};
