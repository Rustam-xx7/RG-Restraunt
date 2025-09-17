"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebaseconfig";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Image from "next/image";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Store user object
  const [quantityLoadingIdx, setQuantityLoadingIdx] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); // Save user for later use
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().cart) {
          setCartItems(userSnap.data().cart);
        } else {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  // Calculate total price from cartItems
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Place order handler
  const handlePlaceOrder = async () => {
    if (!user || cartItems.length === 0) return;
    setLoading(true);
    try {
      // Get user details
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : {};

      // Check for required fields
      if (!userData.name || !userData.contact || !userData.location) {
        alert("Name and contact are required to place an order.");
        setLoading(false);
        return;
      }

      // Create order object
      const order = {
        userId: user.uid,
        userDetails: {
          name: userData.name,
          email: user.email,
          contact: userData.contact,
          location: userData.location || "Not provided",
          status: "pending",
        },
        totalPrice: totalPrice,
        items: cartItems,
        createdAt: new Date(),
      };

      // Add to orders collection
      await addDoc(collection(db, "orders"), order);

      // Optionally clear cart
      await updateDoc(userRef, { cart: [] });
      setCartItems([]);
      toast("Order is placed ! 🥳", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      alert("Failed to place order.");
    }
    setLoading(false);
  };

  // Remove item handler
  const handleRemoveItem = async (index) => {
    if (!user) return;
    setLoading(true);
    try {
      const newCart = cartItems.filter((_, idx) => idx !== index);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { cart: newCart });
      setCartItems(newCart);
    } catch (error) {
      alert("Failed to remove item.");
    }
    setLoading(false);
  };

  const handleChangeQuantity = async (index, delta) => {
    if (!user) return;
    setQuantityLoadingIdx(index); // Only disable the clicked button
    // Optimistically update UI
    setCartItems((prevCart) => {
      return prevCart
        .map((item, idx) => {
          if (idx === index) {
            const newQuantity = item.quantity + delta;
            if (newQuantity < 1) return null;
            const unitPrice =
              item.unitPrice || item.price / item.quantity || item.price;
            return {
              ...item,
              quantity: newQuantity,
              price: unitPrice * newQuantity,
              unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean);
    });

    try {
      const newCart = cartItems
        .map((item, idx) => {
          if (idx === index) {
            const newQuantity = item.quantity + delta;
            if (newQuantity < 1) return null;
            const unitPrice =
              item.unitPrice || item.price / item.quantity || item.price;
            return {
              ...item,
              quantity: newQuantity,
              price: unitPrice * newQuantity,
              unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { cart: newCart });
    } catch (error) {
      alert("Failed to update quantity.");
    }
    setQuantityLoadingIdx(null);
  };

  return (
    <div className="pt-20 px-5 text-white">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <h2 className="text-xl mb-4 font-semibold font-sans border-b border-gray-400/50 text-amber-100">
        Cart Items
      </h2>
      {loading ? (
        <div className="mask-conic-from-neutral-800">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="text-xl font-semibold">No items in cart .</div>
      ) : (
        <>
          {cartItems.map((item, idx) => (
            <div
              key={idx}
              className="mb-2 border-b border-amber-200/50 pb-2 flex items-center justify-between"
            >
              <div className="flex gap-4 px-2">
                <Image
                  src={`/img/${item.title}.jpeg`}
                  height={20}
                  width={70}
                  className="rounded-lg object-cover object-top h-15 w-15"
                  alt="img"
                />
                <span>
                  <span className="font-semibold">{item.title}</span>
                  <br />
                  Qnt: {item.quantity}
                  <br />
                  Price: {item.price}/-{" "}
                  <span className="text-xs text-gray-300">
                    (₹
                    {item.unitPrice ||
                      item.price / item.quantity ||
                      item.price}{" "}
                    each)
                  </span>
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  className="px-2 py-1 bg-green-600 rounded text-sm font-semibold"
                  onClick={() => handleChangeQuantity(idx, 1)}
                  disabled={quantityLoadingIdx === idx}
                >
                  +
                </button>
                <button
                  className="px-2 py-1 bg-amber-400 rounded text-sm font-semibold"
                  onClick={() => handleChangeQuantity(idx, -1)}
                  disabled={quantityLoadingIdx === idx}
                >
                  −
                </button>
              </div>
            </div>
          ))}
          {/* Total Price Section */}
          <div className="mb-4 text-lg font-bold text-amber-300">
            Total Price: {totalPrice}/-
          </div>
          <div className="w-full flex justify-center">
            <button
              className="mt-4 md:w-100 md:mx-10 px-4 py-2 border border-black/30 bg-black/30 shadow-xl text-green-200  rounded w-full font-semibold"
              // onClick={handlePlaceOrder}   // this option 
              disabled={loading}
            >
              Place Order
            </button>
          </div>
          <br />
        </>
      )}
      <Link
        href="/myOrders"
        className="border border-gray-400/60 rounded-sm p-2 mt-5 inline-block bg-amber-600/50 font-semibold"
      >
        My Placed <span className="text-amber-300">O</span>rders
      </Link>
    </div>
  );
};

export default Cart;
