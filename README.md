# Frog Wallet - TBDex Hackathon Submission

## 🐸 Frog Wallet

Frog Wallet is a decentralized wallet application built for managing digital assets with an intuitive and secure user experience. It is designed to allow users to easily track balances, view transaction history, and manage multiple crypto assets within a seamless interface. The application integrates with TBDex protocol to ensure secure and decentralized exchanges, promoting privacy and ownership over personal data and funds.

---

## 🏆 Submission for TBDex Hackathon

This project is part of the TBDex Hackathon, which encourages the development of decentralized financial systems and applications with focus on self-sovereign identity and verifiable credentials.

---

## 🚀 Features

- **Decentralized Wallet Management**: Create, view, and manage multiple wallet addresses in a secure environment.
- **Transaction Tracking**: View detailed transaction histories and balances for multiple assets.
- **Firebase Authentication**: Secure login and user verification system to keep user data safe.
- **Responsive UI**: Designed with Next.js and TailwindCSS for a responsive and adaptive interface, suitable for both desktop and mobile.
- **Seamless Integration with TBDex Protocol**: Enables peer-to-peer asset exchange with decentralized identity features.
- **Real-Time Notifications**: Firebase integration for push notifications about transaction status updates.
- **UI Theming**: Custom dark and light modes using TailwindCSS and theme options for accessibility.

---

## 🛠️ Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): A React framework for fast page loading, dynamic routing, and seamless SSR.
  - [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for designing modern UIs.
  - [React Icons](https://react-icons.github.io/react-icons/): For adding icons to improve visual navigation.
- **Backend**:
  - [Firebase](https://firebase.google.com/): Real-time database and authentication for secure user data handling.
  - [TBDex Protocol](https://www.tbdex.io/): Enables decentralized, verifiable identity and secure exchanges.
- **Authentication**:
  - Firebase Auth: For secure user authentication and session handling.
- **Deployment**:
  - Vercel: Fast and easy deployment for serverless functions and frontend.

---

## 🔧 Installation

### Prerequisites:

1. Ensure you have [Node.js](https://nodejs.org/en/) installed on your machine.
2. Install [Yarn](https://yarnpkg.com/) or use npm for package management.

### Steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/rayeli7/frog
   cd frog-wallet
   ```

   Install dependencies:

2. bash
   yarn install
   or

3. bash
   Copiar código
   npm install
   Set up Firebase:

4. Create a Firebase project and enable Firebase Authentication.
   Set up a Firestore database for real-time data tracking.
   Add Firebase credentials in .env.local:
   env

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Run the development server:

5.  bash
    yarn dev
    or

bash
npm run dev

6.  Open http://localhost:3000 in your browser to view the app.

📖 Usage
Sign Up: Create an account using Firebase Authentication.
Wallet Dashboard: View balances, add wallets, and track transactions.
Manage Assets: Easily add, remove, or view crypto assets in your wallet.
Peer-to-Peer Exchange: Use TBDex Protocol to initiate asset transfers.
Notifications: Receive real-time updates on transaction status.

💡 Future Enhancements
Multi-Chain Support: Support for additional blockchains and assets.
Enhanced Security: Add 2FA (Two-factor authentication) for extra security.
Advanced Analytics: Provide insights and trends on asset movements.
Offline Mode: Enable users to view wallet balances and transaction history offline.

👥 Team
Name: Raymond Eli
Role: Beginner Developer
Email: raymond7eli@gmail.com

## Acknowledgments

- Some code was adapted from [TBD project](https://github.com/TBD54566975/) under [MIT License](https://opensource.org/licenses/MIT).

## Design Attribution

- The design template used in this project is from [Figma BankDash UI kit], created by [Designer Name]. and Shadcn/ui (https://github.com/shadcn-ui/ui)
