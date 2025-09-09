"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import { getDoc } from "firebase/firestore";
import { auth } from "../firebaseconfig";
import { db } from "../firebaseconfig";
import Link from "next/link";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ordersCol = collection(db, "orders");
    const unsubscribe = onSnapshot(ordersCol, (ordersSnap) => {
      const ordersList = ordersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setLoadingOrders(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().role === "admin") {
        setAllowed(true);
      } else {
        setAllowed(false);
        router.push("/login");
      }
      setLoadingAdmin(false);
    };
    checkAdmin();
  }, [router]);

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        "userDetails.status": newStatus,
      });
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // Function to delete order
  const deleteOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await deleteDoc(orderRef);
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  if (loadingAdmin && loadingOrders) return <p>Loading...</p>;
  if (!allowed)
    return (
      <p className="pt-20 px-10 text-red-500 text-xl">You are not admin.</p>
    );

  return (
    <div className="pt-20 px-10 text-white bg-black/80 min-h-screen py-4">
      <h2 className="text-2xl mb-6 font-semibold">Admin Dashboard - Orders</h2>
      <Link href="/reviewList">
        <button className=" w-fit px-4 py-2 border-amber-600 border-2 bg-black/30 shadow-md shadow-amber-800/30  font-serif text-xl font-extralight rounded-sm mb-8 ">
          Go to Review List
        </button>
      </Link>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="w-full flex flex-col gap-6  items-center">
          {orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-6 border border-gray-700 shadow-md shadow-orange-500 rounded md:w-fit"
            >
              <div>
                <strong>Name:</strong> {order.userDetails?.name || "N/A"}
              </div>
              <div>
                <strong>Contact:</strong> {order.userDetails?.contact || "N/A"}
              </div>
              <div>
                <strong>Location:</strong>{" "}
                {order.userDetails?.location || "N/A"}
              </div>
              <div>
                <strong>Status:</strong> {order.userDetails?.status || "N/A"}
              </div>
              <div>
                <strong>Total Price:</strong> {order.totalPrice || "N/A"}
              </div>
              <div className="my-2 flex gap-2 flex-wrap">
                <button
                  className="px-3 py-1 bg-yellow-600 rounded"
                  onClick={() => updateOrderStatus(order.id, "pending")}
                >
                  Pending
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 rounded"
                  onClick={() => updateOrderStatus(order.id, "delivered")}
                >
                  Delivered
                </button>
                <button
                  className="px-3 py-1 bg-green-600 rounded"
                  onClick={() => updateOrderStatus(order.id, "complete")}
                >
                  Complete
                </button>
                <button
                  className="px-3 py-1 bg-red-600 rounded"
                  onClick={() => deleteOrder(order.id)}
                >
                  Clear
                </button>
              </div>
              <div>
                <strong>Items:</strong>
              </div>
              <ul className="ml-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} - Qty: {item.quantity} - Price: {item.price}
                      /-
                    </li>
                  ))
                ) : (
                  <li>No items</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
