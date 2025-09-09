"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseconfig";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snapshot) => {
      const reviewData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewData);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "reviews", id));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        setLoadingAdmin(false);
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
    });
    return () => unsubscribe();
  }, []);

  if (loadingAdmin) return <p>Loading...</p>;
  if (!allowed) return null;

  return (
    <div className="pt-20 pb-10 px-10 text-white bg-black/80 min-h-screen">
      <h2 className=" text-2xl font-semibold my-2 mb-4 border-b border-amber-700/60 pb-2">
        Review List
      </h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-6">
              <div className="max-w-150 word-brea overflow-x-auto bg-gray-200/10 flex flex-col justify-center items-start p-4 rounded-md shadow-lg shadow-amber-600/50">
                <strong className="font-semibold text-xl border-b border-gray-300/50 mb-2 pb-2">
                  {review.name || "No Name"}
                </strong>
                <p className="font-sans pb-2">
                  {review.message || "No Content"}
                </p>
                <p className="text-amber-100">{review.email || "No Content"}</p>
                <p className="text-gray-200/60">
                  {review.createdAt
                    ? new Date(review.createdAt.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 border w-fit mt-4 rounded-xl text-red-600 font-semibold bg-black/20 shadow-xl shadow-black/30"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
