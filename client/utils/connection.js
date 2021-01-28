import socketIoClient from "socket.io-client";

export default (path) => {
  const io = socketIoClient(path);

  return {
    getConversations (userId) {
      io.emit("getConversations", userId);
    },

    setConversations() {
      return new Promise((resolve, reject) => {
        io.on("sendConversations", (data) => {
          return resolve(data);
        });
      });
    },

    getContacts(userId) {
      io.emit("getContacts", userId);
    },

    setContacts() {
      return new Promise((resolve, reject) => {
        io.on("sendContacts", (data) => resolve(data));
      });
    },

    sendMessage(content) {
      io.emit("newMessage", content);
    },

    updateMessages() {
      return new Promise((resolve, reject) => {
        io.on("newMessage", (resp) => resolve(resp));
      });
    },

    async initConversations(members) {
      io.emit("initConversation", members);
    },
  };
};
