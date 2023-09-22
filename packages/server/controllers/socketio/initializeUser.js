const redisClient = require("../../redis")

const initializeUser = async (socket) => {
    //Copy session info into socket.user
    socket.user = { ...socket.request.session.user };
    // Set friends
    await redisClient.hset(
      `userid:${socket.user.username}`,
      "userid",
      socket.user.userid,
      "connected",
      true
    );
  
    //Get friends list
    const friendList = await redisClient.lrange(
      `friends:${socket.user.username}`,
      0,
      -1
    );
    console.log("friendslist", friendList);
    socket.emit("friends", friendList);
  
    //Logging
    console.log("USERID: ", socket.user.userid);
    console.log("Current username", socket.user.username);
  };

  module.exports = initializeUser