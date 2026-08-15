# RG Restaurant — Online Order Booking System

A full-stack restaurant website and order-booking platform built for **Shankar's Restaurant** (Bengali cuisine, East Burdwan). This was a freelance project delivered end-to-end — from landing page and digital menu to user login and cart/order flow.

🔗 **Live Demo:** [rgrestraunt.vercel.app](https://rgrestraunt.vercel.app)

---

## 📖 About

RG Restaurant is a customer-facing web app that lets diners:

- Browse the restaurant's story and highlights on the home page
- View a digital **menu**
- **Log in** to place orders
- Add items to a **cart** and check out
- Leave a **review / contact** the restaurant directly

The goal was to replace manual, phone-based order taking with a simple online booking experience the restaurant could point customers to.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Backend / Database / Auth | [Firebase](https://firebase.google.com) |
| Icons & Animation | Lordicon, Lottie (`lottie-web`) |
| Notifications | react-toastify |
| Linting | ESLint (Next.js config) |
| Deployment | Vercel |

> **Note:** A separate version of this project integrates **Razorpay** for online payment collection instead of (or in addition to) Firebase-only order handling. This repo, as it currently stands, uses Firebase for data/auth. If you're looking for the payments-enabled build, check the corresponding branch/repo where Razorpay is wired in.

---

## ✨ Features

- 🏠 Responsive landing page with restaurant story & highlights
- 🍽️ Digital menu listing
- 🔐 User authentication (Firebase Auth)
- 🛒 Cart-based order flow
- ⭐ Customer review / contact form
- 📱 Mobile-friendly, image-optimized UI (Next.js Image)
- 🔔 Toast notifications for user feedback (add to cart, login, errors, etc.)

---

## 📁 Project Structure
```
RG-Restraunt/
├── app/ # Next.js App Router pages & routes (home, menu, login, cart, contact)
├── public/ # Static assets (images, icons, logos)
├── eslint.config.mjs
├── next.config.mjs
├── postcss.config.mjs
├── jsconfig.json
├── package.json
└── README.md
```
---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project (for Auth + Database)

### 1. Clone the repo

```bash
git clone https://github.com/Rustam-xx7/RG-Restraunt.git
cd RG-Restraunt
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

*(If using the Razorpay-enabled variant, also add `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.)*

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📦 Build & Deploy

```bash
npm run build
npm run start
```

This project is deployed on **Vercel**. Any push to `main` can be auto-deployed by connecting the repo to a Vercel project.

---

## 👨‍💻 Author

**Dipayan Chakraborty** ([Rustam-xx7](https://github.com/Rustam-xx7))
Freelance project built for Shankar's Restaurant.

---

## 📄 License

This project was built as a client/freelance deliverable. Add a license here if you intend to open-source it (e.g. MIT), otherwise mark it as proprietary/client-owned.
