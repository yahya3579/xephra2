const { Server } = require("socket.io");
const MessageModel = require("../models/Message");
const AdminChatGroupModel = require("../models/AdminChatGroup");
const AdminMessageModel = require("../models/AdminMessage");

  const socketSetup = (server) => {
    const io = new Server(server, {
      cors: {
      // origin: "https://xephra.net", // Update with your frontend URL
        // origin: "https://xephra-two.vercel.app",
        origin: "http://xephra.net",
        // origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
      },
      transports: ["websocket", "polling"]  
    });

  // Keep track of online users and their socket connections
  const activeUsers = new Map(); // userId -> online status
  const userSockets = new Map(); // socketId -> userId

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    // Store user information if provided in the query
    const userId = socket.handshake.query.userId;
    if (userId) {
      activeUsers.set(userId, true);
      userSockets.set(socket.id, userId);
      console.log(`User ${userId} is now online`);
    }

    // Handle sending messages
    socket.on("sendMessage" , async ({ chatGroupId, message }) => {
      try {
        let savedMessage;
        
    
        // Check if the chat group belongs to an admin
        const isAdminChat = await AdminChatGroupModel.exists({ _id: chatGroupId });
    
        if (isAdminChat) {
         
          const newMessage = new AdminMessageModel({
            chatGroupId,
            senderId: message.senderId,
            text: message.text,
            time: message.time,
          });
          savedMessage = await newMessage.save();
        } else {
          const newMessage = new MessageModel({
            chatGroupId,
            senderId: message.senderId,
            text: message.text,
            time: message.time,
          });
          savedMessage = await newMessage.save();
        }
    
        // Broadcast message
        const messageToSend = { ...message, chatGroupId, _id: savedMessage._id };
        io.to(chatGroupId).emit("receiveMessage", messageToSend);
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit("messageError", { error: "Failed to save message" });
      }
    });

    // Handle joining chat groups - with confirmation
    socket.on("joinChat", (chatGroupId) => {
      if (!chatGroupId) {
        console.error("Invalid chatGroupId");
        return;
      }
      
      // Join the new chat room
      socket.join(chatGroupId);
      
      
      // Confirm to the client that they joined
      socket.emit("joinedChat", { chatGroupId });
    });
    
    // Handle leaving chat groups
    socket.on("leaveChat", (chatGroupId) => {
      if (chatGroupId) {
        socket.leave(chatGroupId);
       
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      
      // Clean up when user disconnects
      if (userSockets.has(socket.id)) {
        const userId = userSockets.get(socket.id);
        activeUsers.delete(userId);
        userSockets.delete(socket.id);
        
      }
    });
  });

  return io;
};

module.exports = socketSetup;