import socketIoClient from "socket.io-client";

export default (path) => {
  const io = socketIoClient(path);

  return {
    getMessages() {
      return new Promise((resolve, reject) => {
        io.on("sendConversation", (resp) => resolve(resp.messages));
      });
    },

    sendMessage(content) {
      io.emit("newMessage", content);
    },

    updateMessages() {
      console.log("pies");
      return new Promise((resolve, reject) => {
        io.on("newMessage", (resp) => resolve(resp));
      });
    },

    addConversation(userId) {
      io.emit("addConversation", userId);
    },
  };
};
