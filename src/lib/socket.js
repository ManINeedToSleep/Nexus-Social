import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Change to your deployed backend later

export default socket;
