const redisClient = require("../redis");

module.exports.authorizeUser = (socket, next) => {
  // If user has no session or not logged in then throw an error
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad request");
    next(new Error("Not Authorized"));
  } else {
    next();
  }
};

//Copy session info into socket.user
module.exports.initializeUser = async (socket) => {
  socket.user = { ...socket.request.session.user };
  // Set friends
  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid
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

module.exports.addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({
      done: false,
      errorMsg: "Cannot add self",
    });
    return;
  }
  const friendUserId = await redisClient.hget(`userid:${friendName}`, "userid");
  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friendUserId) {
    cb({ done: false, errorMsg: "User doesn't exist" });
    return;
  }

  if (currentFriendList && currentFriendList.indexOf(friendName) !== -1) {
    cb({
      done: false,
      errorMsg: `${friendName} is already a friend`,
    });
    return;
  }

  await redisClient.lpush(`friends:${socket.user.username}`, friendName);
  cb({
    done: true,
  });
};
