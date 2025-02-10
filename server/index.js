/**
 * Real-time Server Implementation
 * 
 * This server handles real-time communication between clients using Socket.io.
 * It's separate from the Next.js frontend to handle WebSocket connections
 * and provide real-time messaging capabilities.
 */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// Initialize Express and enable CORS for all routes
const app = express();
app.use(cors());

// Create HTTP server and wrap it with Socket.io
const server = createServer(app);
const io = new Server(server, { 
  cors: { origin: "*" } // Allow connections from any origin (configure for production)
});

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle incoming messages and broadcast to all clients
  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  // Clean up on disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

// Start server on port 3001 (separate from Next.js port 3000)
server.listen(3001, () => console.log("Server running on port 3001"));
