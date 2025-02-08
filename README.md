# Social App MVP

A minimal social media platform built with Next.js, Tailwind CSS, Firebase, Zustand, and Socket.io. This MVP showcases core functionalities such as user authentication, text-based posting, and real-time private messaging.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation and Setup](#installation-and-setup)
- [Firebase Setup](#firebase-setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Git & .gitignore](#git--gitignore)
- [Additional Notes](#additional-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Sign up, login, and logout using Firebase Auth.
- **User Profiles:** Manage and display user data.
- **Posts:** Create and display text-based posts.
- **Real-Time Messaging:** Chat functionality powered by Socket.io.
- **UI Animations:** Enhanced interactions with Framer Motion.
- **Responsive Design:** Styled with Tailwind CSS for a modern look.

## Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/) (React 18/19) with App Router  
  - [Tailwind CSS](https://tailwindcss.com/)  
  - [Framer Motion](https://www.framer.com/motion/)  
- **State Management:**  
  - [Zustand](https://github.com/pmndrs/zustand)
- **Backend:**  
  - [Firebase](https://firebase.google.com/) for Authentication, Firestore, and Storage  
  - Custom Express server with [Socket.io](https://socket.io/) for real-time messaging (in the `/server` folder)
- **Optional:**  
  - TypeScript (our project supports it, as seen with the `tailwind.config.ts` file)

## Folder Structure

```
my-social-app/
├── public/                  # Static assets (logos, images, favicons)
├── server/                  # Backend (Express + Socket.io)
│   ├── index.js             # Server entry point (Socket.io & Express)
│   └── package.json         # Server dependencies
├── src/                     # Main application source code
│   ├── app/                 # Next.js App Router pages & layouts
│   │   ├── layout.tsx       # Global layout (e.g., Navbar, Footer)
│   │   ├── page.tsx         # Home page
│   │   ├── auth/            # Authentication pages (login, signup)
│   │   ├── chat/            # Chat feature pages
│   │   ├── posts/           # Posts/Feed pages
│   │   └── profile/         # User profile pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities (Firebase setup, Socket.io client, etc.)
│   ├── store/               # Global state management (Zustand stores)
│   ├── hooks/               # Custom React hooks
│   └── styles/              # Global and component-specific styles
├── .env.local               # Environment variables (Firebase config, etc.)
├── tailwind.config.ts       # Tailwind CSS configuration file (TypeScript)
├── next.config.js           # Next.js configuration file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (or yarn)
- A [Firebase](https://firebase.google.com/) account

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd my-social-app

## Installation

### Frontend Dependencies

bash
npm install

### Server Dependencies

bash
cd server
npm install
cd ..

## Firebase Setup

### 1. Create Firebase Project
- Visit the [Firebase Console](https://console.firebase.google.com)
- Create a new project

### 2. Enable Firebase Services
- **Authentication**: Enable sign-in methods (Email/Password, Google)
- **Firestore Database**: Set up Firestore
- **Cloud Storage**: Enable for image/profile storage

### 3. Configure Environment Variables
1. Get your Firebase configuration from project settings
2. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Initialization
Create `src/lib/firebase.js`:
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
```

## Running the Application

### Start Frontend (Next.js)

bash
cd server
node index.js

Your Socket.io server will be running on port 3001

## Deployment

### Frontend
Deploy your Next.js app to Vercel:
- Connect your GitHub repository
- Vercel will handle the deployment automatically

### Backend (Socket.io Server)
For production deployment of your real-time server, consider:
- Render
- Heroku

## Project Configuration

### Git & .gitignore
Add the following to your `.gitignore`:

```gitignore
# Ignore node_modules in the root and subdirectories
node_modules/
**/node_modules/

# Ignore environment variables
.env.local
```

## Additional Notes

### State Management
- Using Zustand for lightweight, global state management
- Check `src/store/` directory (e.g., `useAuthStore.js`)

### Real-Time Messaging
- Backend: See `server/index.js`
- Frontend: See `src/lib/socket.js`

### UI Components
Several UI options available:
- Chakra UI
- Mantine
- Headless UI
- Radix UI
- Framer Motion (for animations)

### TypeScript Support
- Project supports TypeScript (e.g., `tailwind.config.ts`)
- JavaScript examples can be converted to TypeScript as needed

## Contributing
Contributions are welcome! Please:
- Open issues for bugs or features
- Submit pull requests for improvements

## License
This project is licensed under the MIT License.

