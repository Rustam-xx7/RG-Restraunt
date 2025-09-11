"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { db } from "../firebaseconfig";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeOrders = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        if (unsubscribeOrders) unsubscribeOrders();
        return;
      }

      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.uid));
      setLoading(true);
      unsubscribeOrders = onSnapshot(q, (querySnapshot) => {
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeOrders) unsubscribeOrders();
    };
  }, []);

  // Function to cancel (delete) an order
  const handleCancelOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      // Optionally, you can show a toast or notification here
    } catch (error) {
      console.error("Error cancelling order:", error);
      // Optionally, show error to user
    }
  };

  return (
    <div className="pt-20 pb-8 px-5 text-white">
      <h2 className="text-2xl mb-4 font-semibold">My Orders</h2>
      {loading ? (
        <div className="mask-conic-from-neutral-100">Loading...</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul className="list-disc pl-5 font-mono">
          {orders.map((order) => (
            <li
              key={order.id}
              className="relative mb-4 border-b border-amber-400/60 pb-6"
            >
              {/* <div className="font-light text-gray-400">Order ID: {order.id}</div> */}
              <div className="absolute bottom-0 right-0 text-sm text-gray-300/70">
                {" "}
                {order.createdAt
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </div>
              <div className="absolute bottom-0 left-0">
                Total: ₹{order.totalPrice}
              </div>
              <div>State : {order.userDetails.status}</div>
              <div>
                <span className="font-semibold text-amber-200">Items:</span>
                <ul className="ml-4 font-semibold">
                  {order.items &&
                    order.items.map((item, idx) => (
                      <li key={idx} className="flex gap-4 mt-2">
                        <Image
                          src={`/img/${item.title}.jpeg`}
                          height={20}
                          width={70}
                          className="rounded-lg object-cover object-top h-15 w-15"
                          alt="img"
                        />
                        {item.title} <br /> Qty: {item.quantity} = {item.price}
                        /-
                      </li>
                    ))}
                </ul>
              </div>
              {/* Cancel Order Button */}
              <button
                className="mt-4 mb-2  px-4 py-2 shadow-md shadow-black/40  bg-red-600 text-white text-xs  rounded-md hover:bg-red-700"
                onClick={() => handleCancelOrder(order.id)}
              >
                Cancel Order
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center items-center opacity-50">
        <span>Orders will be disappeared after being complete !</span>
      </div>
    </div>
  );
};

export default MyOrders;
