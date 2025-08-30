"use client"
import React from 'react'
import Login from '../loginComponent';
// Imports for authentication
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";

const login = () => {
  return (
    <div className='pt-20 px-10 text-white'>
      login page
      <Login/>
    </div>
  )
}

export default login
