/**
 * Socket.io Client Configuration
 * 
 * Establishes and exports a Socket.io client connection to our real-time server.
 * This singleton instance is used throughout the application for real-time features.
 * 
 * @note Change the URL for production deployment
 */

import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";
const socket = io(SOCKET_URL);

export default socket; 