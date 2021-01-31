import socketIoClient from "socket.io-client";

export default (path, id) => {
  const io = socketIoClient(path, { query: { id } });

  return {
    getConversations() {
      io.emit("getConversations", id);
    },

    setConversations() {
      return new Promise((resolve, reject) => {
        io.on("sendConversations", (data) => {
          return resolve(data);
        });
      });
    },

    getContacts() {
      io.emit("getContacts", id);
    },

    setContacts() {
      return new Promise((resolve, reject) => {
        io.on("sendContacts", (data) => resolve(data));
      });
    },

    sendMessage(content) {
      io.emit("newMessage", content);
    },

    async getMessage() {
      return new Promise((resolve, reject) => {
        io.on("sendNewMessage", (resp) => resolve(resp));
      });
    },

    initConversations(members) {
      io.emit("initConversation", members);
    },
  };
};
