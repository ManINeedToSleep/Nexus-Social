<div align="center">

# 🌟 Nexus Social

A modern social platform built with cutting-edge technologies, featuring real-time interactions and a sleek dark theme UI.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.3.0-orange?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Demo]([your-demo-link](https://nexus-social-git-main-manineedtosleeps-projects.vercel.app)) · [Documentation](your-docs-link) · [Report Bug](issues-link)

<img src="/images/frontpage.socialfeed.png" alt="Nexus Social Feed Preview" width="800"/>

</div>

## ✨ Features

### 🔐 Authentication
- **Secure Firebase Auth**
  - Email/Password with validation
  - One-click Google OAuth
  - Persistent sessions
  - Protected routes

### 📱 Social Core
- **Dynamic Post System**
  - Real-time post feed
  - Like/Unlike interactions
  - Nested comments
  - Timestamp localization

### ⚡ Real-Time
- **Socket.io Integration**
  - Instant messaging
  - Live notifications
  - Connection management
  - Real-time updates

### 🎨 Modern UI
- **Polished Design**
  - Dark theme
  - Glassmorphism effects
  - Responsive layout
  - Smooth animations

## 🛠️ Tech Stack

<details>
<summary>Click to expand</summary>

### Frontend
```typescript
{
  "core": {
    "framework": "Next.js 15.1.6",
    "ui": "React 19.0.0",
    "styling": "Tailwind CSS 3.4.1",
    "animations": "Framer Motion 12.4.1",
    "state": "Zustand 5.0.3"
  }
}
```

### Backend
```typescript
{
  "services": {
    "database": "Firebase/Firestore 11.3.0",
    "auth": "Firebase Auth",
    "realtime": {
      "server": "Express 4.21.2",
      "websockets": "Socket.io 4.8.1"
    }
  }
}
```

### Development
```typescript
{
  "language": "TypeScript 5",
  "linting": "ESLint 9",
  "formatting": "Prettier",
  "package-manager": "npm"
}
```
</details>

## 📁 Project Structure

<details>
<summary>Expand to view full structure</summary>

```
nexus-social/
├── 📱 src/
│   ├── app/                      # Next.js pages & layouts
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Landing page
│   │   ├── auth/
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   └── dashboard/          # Protected dashboard routes
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   │   ├── SignInForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── PostFeed.tsx    # Main post feed
│   │   │   └── DashboardNavbar.tsx
│   │   └── ui/                 # Shared UI components
│   │       ├── Button.tsx
│   │       └── LoadingSpinner.tsx
│   ├── lib/                    # Core utilities
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── socket.js          # Socket.io client setup
│   ├── store/                  # State management
│   │   └── useAuthStore.ts    # Authentication state
│   ├── styles/                 # Global styles
│   │   └── globals.css        # Tailwind imports
│   ├── types/                  # TypeScript types
│   │   └── index.ts           # Shared types
│   └── utils/                  # Utility functions
│       └── dateFormat.ts      # Date formatting
├── 🔌 server/                  # Socket.io backend
│   ├── index.js               # Express & Socket.io setup
│   └── package.json           # Server dependencies
├── 🎨 public/                 # Static assets
│   ├── images/
│   │   └── default_pfp.jpg    # Default profile picture
│   └── favicon.ico
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```
</details>

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm/yarn
- Firebase account
- Git

### Environment Setup

1️⃣ **Firebase Configuration**
Create a new Firebase project and enable:
- Authentication (Email/Password & Google)
- Firestore Database
- Realtime Database (optional)

2️⃣ **Environment Variables**
Create `.env.local` in the root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Socket.io Configuration (for development)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Other Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

3️⃣ **Firebase Security Rules**
Add these rules to your Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && resource.data.authorId == request.auth.uid;
    }
  }
}
```

4️⃣ **Development Setup**
```bash
# Install dependencies
npm install

# Install server dependencies
cd server && npm install
cd ..

# Start development servers
npm run dev          # Terminal 1: Next.js frontend
cd server && node index.js  # Terminal 2: Socket.io backend
```

5️⃣ **TypeScript Configuration**
The `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 📊 Implementation Status

### ✅ Completed
- User authentication system
- Post creation & feed
- Like/Unlike functionality
- Comments system
- Real-time messaging setup
- Responsive dark UI
- Route protection

### 🔄 In Progress
- Image upload system
- User profiles
- Advanced post features
- Enhanced real-time features

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

Licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by ManINeedToSleep

[⬆ Back to Top](#nexus-social)

</div>

