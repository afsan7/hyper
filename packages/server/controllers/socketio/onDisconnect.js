const redisClient = require("../../redis");
const parseFriendsList = require("./parseFriendsList");

const onDisconnect = async (socket) => {
  try {
    await redisClient.hset(
      `userid:${socket.user.username}`,
      "connected",
      false
    );
    //Get Friends
    //Emit to all friends our offline status
    const friendList = await redisClient.lrange(
      `friends:${socket.user.username}`,
      0,
      -1
    );

    //Get userids from friendList
    const parsedFriendsList = await parseFriendsList(friendList)
    const friendsRooms = parsedFriendsList.map(friend => friend.userid)

    socket.to(friendsRooms).emit("connected", false, socket.user.username);
  } catch (error) {
    console.log("Error occurred:", error);
  }
};

module.exports = onDisconnect;
