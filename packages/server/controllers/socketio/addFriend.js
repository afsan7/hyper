const redisClient = require("../../redis");

const addFriend = async (socket, friendName, cb) => {
  //Check if we are trying to add ourself
  if (friendName === socket.user.username) {
    cb({
      done: false,
      errorMsg: "Cannot add self",
    });
    return;
  }

  const friend = await redisClient.hgetall(`userid:${friendName}`);
  //Get friends for a username
  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friend.userid) {
    cb({ done: false, errorMsg: "User doesn't exist" });
    return;
  }
  //Check if friend exists in the friendList
  if (currentFriendList && currentFriendList.indexOf(`${friendName}.${friend.userid}`) !== -1) {
    cb({
      done: false,
      errorMsg: `${friendName} is already a friend`,
    });
    return;
  }
  //Add friend to the friendlist.Join friendName and friend's userdid with a "."
  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userid].join(".")
  );

  const newFriend = {
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  };
  cb({
    done: true,
  });
};

module.exports = addFriend;
