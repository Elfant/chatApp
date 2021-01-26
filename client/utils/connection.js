import socketIoClient from "socket.io-client";

export default (path) => {
  const io = socketIoClient(path);

  return {
    getConversations(userId) {
      io.emit("getConversations", userId);
    },

    setConversations() {
      return new Promise((resolve, reject) => {
        io.on("sendConversations", (data) => resolve(data));
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
      console.log("pies");
      return new Promise((resolve, reject) => {
        io.on("newMessage", (resp) => resolve(resp));
      });
    },

    initConversations(userId) {
      io.emit("initConversations", userId);
    },

    addConversation(conversation) {
      io.emit("addConversation", conversation);
    },
  };
};
