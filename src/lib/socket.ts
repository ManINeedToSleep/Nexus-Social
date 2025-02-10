/**
 * Socket.io Client Configuration
 * 
 * Establishes and exports a Socket.io client connection to our real-time server.
 * This singleton instance is used throughout the application for real-time features.
 * 
 * @note Change the URL for production deployment
 */

import { io } from "socket.io-client";

// Create a single socket instance for the entire application
const socket = io("http://localhost:3001");

export default socket; 