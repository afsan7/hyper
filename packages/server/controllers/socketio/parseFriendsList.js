const redisClient = require("../../redis");
const parseFriendsList = async (friendlist) => {
  const newFriendList = []; // List of friends and their connected statuses

  // Retrieve connection status for each friend in the friendlist
  // And push them to the list
  for (let friend of friendlist) {
    const parsedFriend = friend.split(".");
    const friendConnected = await redisClient.hget(
      `userid:${parsedFriend[0]}`,
      "connected"
    );
    newFriendList.push({
      username: parsedFriend[0],
      userid: parsedFriend[1],
      connected: Boolean(friendConnected),
    });
  }

  return newFriendList;
};

module.exports = parseFriendsList;
