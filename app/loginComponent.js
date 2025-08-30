import React from 'react'

// imports for database
import { db } from "./firebaseconfig";
import { collection, addDoc, getDoc , setDoc , updateDoc } from "firebase/firestore";
import { get, ref } from "firebase/database";
import { useState, useEffect } from "react";

// Imports for authentication
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseconfig";
import { useRouter } from "next/navigation";
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";

const Login = () => {
  return (
    <div>
      login component
    </div>
  )
}

export default Login
