import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { app } from "../firebaseconfig";
import Link from "next/link";

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      <style>
        {`
          /* Custom scrollbar for review message */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(0,0,0,0.4) transparent;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
          }
        `}
      </style>
      {reviews.length === 0 ? (
        <>
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-white/70 font-semibold">Drop your Review .</p>
            <Link href="/contact">
              <button className=" w-fit px-4 py-2 border-amber-400 border-2 bg-black/30  shadow-md shadow-amber-400/30 font-serif text-sm font-extralight rounded-sm ">
                Review
              </button>
            </Link>
          </div>
        </>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-[250px] bg-black/30 shadow-xl shadow-black/40 h-40 w-60 md:h-60 md:w-80 m-2 p-4 pb-6 rounded-md flex-shrink-0 relative flex flex-col justify-between"
          >
            <h4 className="font-semibold border-b border-gray-400/70 pb-2">
              {review.name || "Anonymous"}
            </h4>
            <p className=" flex-1 overflow-y-auto custom-scrollbar break-words px-2 py-1 rounded">
              {review.message || "No comment"}
            </p>
            <p className="absolute bottom-1 right-2 font-light text-white/60 text-sm">
              {review.createdAt
                ? new Date(review.createdAt.seconds * 1000).toLocaleString()
                : "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewCard;
