const authorizeUser = (socket, next) => {
    // If user has no session or not logged in then throw an error
    if (!socket.request.session || !socket.request.session.user) {
      console.log("Bad request");
      next(new Error("Not Authorized"));
    } else {
      next();
    }
  };

  module.exports = authorizeUser