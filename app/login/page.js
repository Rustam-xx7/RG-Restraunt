"use client";
import React, { useState, useEffect } from "react";
import Login from "../loginComponent";
import UserDashboard from "../userDashboard/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore

const login = () => {
  const [guser, setGuser] = useState(null);
  const [role, setRole] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setGuser(user);
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole("user"); // Default role
        }
      } else {
        setGuser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleAdminDashboard = () => {
    router.push("/adminDashboard"); // Change to your admin dashboard route
  };

  return (
    <div className="pt-20 px-10 text-white">
      {guser ? (
        <>
          <UserDashboard />
          {role === "admin" && (
            <button
              className="mt-10 px-4 py-2 bg-black/30 rounded font-semibold border border-black/20 shadow-md shadow-amber-950 text-purple-200"
              onClick={handleAdminDashboard}
            >
              Go to Admin Dashboard
            </button>
          )}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default login;
