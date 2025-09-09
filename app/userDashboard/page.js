"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

const UserDashboard = () => {
  const auth = getAuth(app);
  const [guser, setGuser] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    contact: "",
    location: "",
  });
  const router = useRouter();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGuser(user);
      } else {
        setGuser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  // geting profile info
  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return; // Prevent error if not logged in
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      }
    };
    fetchProfile();
  }, [auth.currentUser]); // Re-run when currentUser changes

  // saving the profile data .
  const saveProfile = async () => {
    if (!auth.currentUser) return;
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, profile);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    try {
      signOut(auth);
      setGuser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-fit flex flex-col items-center justify-start space-y-2">
      {guser && (
        <div className="mb-4">
          <p>
            Welcome, <b>{guser.email.split("@")[0]}</b>
          </p>
        </div>
      )}
      <div className="bg-black/20 py-4 px-6 pb-6 mb-8  rounded-md flex flex-col space-y-2">
        <h1 className="font-bold text-md border-b-2 text-gray-300">
          Complete Your Profile
        </h1>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold text-gray-300 mr-2">Name :</span>
            <input
              placeholder="Name"
              className="bg-black/40 px-4 py-2 rounded-sm w-full"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <span className="font-semibold text-gray-300 mr-2">Contact :</span>
            <input
              placeholder="Contact"
              className="bg-black/40 px-4 py-2 rounded-sm w-full"
              value={profile.contact}
              onChange={(e) =>
                setProfile({ ...profile, contact: e.target.value })
              }
            />
          </div>
          <div>
            <span className="font-semibold text-gray-300 mr-2">Location :</span>
            <input
              placeholder="Location"
              className="bg-black/40 px-4 py-2 rounded-sm w-full"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>
          <button
            onClick={saveProfile}
            className="border border-black/20 py-2 mt-4 rounded-sm font-semibold shadow-md shadow-black text-green-300 bg-gray-100/10"
          >
            Save
          </button>
        </div>
      </div>
      {guser && (
        <div>
          <button
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800 transition duration-300 shadow-md shadow-black/50 font-semibold text-amber-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
