const redisClient = require("../../redis");

const addFriend = async (socket, friendName, cb) => {
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

module.exports = addFriend