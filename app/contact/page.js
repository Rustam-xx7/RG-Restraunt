"use client";
import React, { useState } from "react";
import { db } from "../firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from "react-toastify";


const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: new Date(),
      });
      toast("❤️ Review submitted!", {
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
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error submitting review: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
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
      <div className="bg-[#5b0017] h-[100vh] pt- text-white flex flex-col items-center justify-center">
        <div className="md:w-100 bg-black/20 shadow-lg shadow-black/50 mx-auto  p-6 rounded-2xl ">
          <h2 className="text-2xl font-bold mb-4">Give your valuable Review</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
            <textarea
              name="message"
              placeholder="Your Review"
              value={form.message}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              rows={4}
              required
              maxLength={150}
            />
            <button
              type="submit"
              className="bg-amber-500 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        <div className="mt-10 text-center text-white/90 bg-black/30 p-4 rounded-lg shadow-lg shadow-black/50">
          <span>Our Contact no : +91 98835 85402</span>
        </div>
      </div>
    </>
  );
};

export default Contact;
