import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { app } from '../firebaseconfig';

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReviews(reviewsData);
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className='min-w-[250px] bg-black/30 shadow-xl shadow-black/40 h-40 w-60 m-2 p-4 pb-6 rounded-md flex-shrink-0 relative flex flex-col justify-between'>
            <h4 className='font-semibold border-b border-gray-400/70 pb-2'>{review.name || 'Anonymous'}</h4>
            <p className=' flex-1 overflow-hidden break-words px-2 py-1 rounded'>
              {review.message || 'No comment'}
            </p>
            <p className='absolute bottom-1 right-2 font-light text-white/60 text-sm'>
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
