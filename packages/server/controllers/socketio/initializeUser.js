const redisClient = require("../../redis");
const parseFriendsList = require("./parseFriendsList");

const initializeUser = async (socket) => {
  //Copy session info into socket.user
  socket.user = { ...socket.request.session.user };
  //Join to user's socket id. Room id is same as the socket id
  socket.join(socket.user.userid);
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

  const parsedFriendsList = await parseFriendsList(friendList);
  console.log(parsedFriendsList);
  const friendsRooms = parsedFriendsList.map((friend) => friend.userid);

  //Set connected status to true
  if (friendsRooms.length > 0) {
    socket.to(friendsRooms).emit("connected", true, socket.user.username);
  }

  socket.emit("friends", parsedFriendsList);
  //Logging
  console.log("USERID: ", socket.user.userid);
  console.log("Current username", socket.user.username);
};

module.exports = initializeUser;
