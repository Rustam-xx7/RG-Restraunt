"use client";
import React from "react";

// imports for database
import { db } from "./firebaseconfig";
import {
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { get, ref } from "firebase/database";
import { useState, useEffect } from "react";

// Imports for authentication
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseconfig";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc } from "firebase/firestore"; // Add this import

const Login = () => {
  // authentication
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [guser, setGuser] = useState(null);
  const [admin, setAdmin] = useState(false);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: user.email,
          name: "",
          contact: "",
          location: "",
          cart: [],
          role: "user",
        });
      }

      return user;
    } catch (error) {
      console.error("Google login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[60vh] gap-6">
      <h1 className="text-3xl font-bold mb-4 text-amber-600 border-b-2 pb-2 border-amber-200/50">
        Login <span className="text-amber-300">or</span> Signin
      </h1>
      <div>
        <button
          onClick={googleLogin}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition duration-300 shadow-md shadow-black/50 font-semibold"
        >
          Login with <span className="text-amber-200">Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
