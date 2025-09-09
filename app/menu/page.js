"use client";
import React, { useState } from "react";
import Image from "next/image";
import Card from "../components/Card";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { app } from "../firebaseconfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from "react-toastify";

// Sample menu data
const menuItems = [
  // Thali
  {
    image: "/img/Veg Thali.jpeg",
    title: "Veg Thali",
    price: 50,
    category: "Thali",
    contains: ["Rice", "Dal", "Sag", "Beguni", "Papad", "Chatni"],
  },
  {
    image: "/img/Fish Thali.jpeg",
    title: "Fish Thali",
    price: 80,
    category: "Thali",
  },
  {
    image: "/img/Egg Thali.jpeg",
    title: "Egg Thali",
    price: 70,
    category: "Thali",
  },
  {
    image: "/img/Chicken Thali.jpeg",
    title: "Chicken Thali",
    price: 140,
    category: "Thali",
  },
  {
    image: "/img/Mutton Thali.jpeg",
    title: "Mutton Thali",
    price: 200,
    category: "Thali",
    contains: ["Rice", "Dal", "Sag", "Beguni", "Papad", "Chatni"],
  },

  // Biryani
  {
    image: "/img/Half Plate Chicken Biryani.jpeg",
    title: "Half Plate Chicken Biryani",
    price: 120,
    category: "Biryani",
  },
  {
    image: "/img/Full Plate Chicken Biryani.jpeg",
    title: "Full Plate Chicken Biryani",
    price: 200,
    category: "Biryani",
  },
  {
    image: "/img/Half Plate Egg Biryani.jpeg",
    title: "Half Plate Egg Biryani",
    price: 70,
    category: "Biryani",
  },
  {
    image: "/img/Full Plate Egg Biryani.jpeg",
    title: "Full Plate Egg Biryani",
    price: 120,
    category: "Biryani",
  },
  {
    image: "/img/Chicken Chaap with Biryani.jpeg",
    title: "Chicken Chaap with Biryani",
    price: 200,
    category: "Biryani",
  },

  // Rolls
  {
    image: "/img/Egg Roll.jpeg",
    title: "Egg Roll",
    price: 35,
    category: "Roll",
  },
  {
    image: "/img/Chicken Roll.jpeg",
    title: "Chicken Roll",
    price: 70,
    category: "Roll",
  },
  {
    image: "/img/Paneer Roll.jpeg",
    title: "Paneer Roll",
    price: 70,
    category: "Roll",
  },
  {
    image: "/img/Egg Moghlai.jpeg",
    title: "Egg Moghlai",
    price: 90,
    category: "Roll",
  },
  {
    image: "/img/Chicken Moghlai.jpeg",
    title: "Chicken Moghlai",
    price: 100,
    category: "Roll",
  },
  {
    image: "/img/Chicken Pakora (4 pcs).jpeg",
    title: "Chicken Pakora (4 pcs)",
    price: 100,
    category: "Snack",
  },

  // Momos
  {
    image: "/img/Chicken Momo (8 pcs).jpeg",
    title: "Chicken Momo (8 pcs)",
    price: 80,
    category: "Momo",
  },
  {
    image: "/img/Fried Momo (8 pcs).jpeg",
    title: "Fried Momo (8 pcs)",
    price: 100,
    category: "Momo",
  },

  // Chowmein
  {
    image: "/img/Egg Chowmein (Full).jpeg",
    title: "Egg Chowmein (Full)",
    price: 80,
    category: "Chowmein",
  },
  {
    image: "/img/Egg Chowmein (Half).jpeg",
    title: "Egg Chowmein (Half)",
    price: 50,
    category: "Chowmein",
  },
  {
    image: "/img/Chicken Chowmein (Full).jpeg",
    title: "Chicken Chowmein (Full)",
    price: 120,
    category: "Chowmein",
  },
  {
    image: "/img/Chicken Chowmein (Half).jpeg",
    title: "Chicken Chowmein (Half)",
    price: 70,
    category: "Chowmein",
  },
  {
    image: "/img/Egg Chicken Chowmein (Full).jpeg",
    title: "Egg Chicken Chowmein (Full)",
    price: 140,
    category: "Chowmein",
  },
  {
    image: "/img/Egg Chicken Chowmein (Half).jpeg",
    title: "Egg Chicken Chowmein (Half)",
    price: 100,
    category: "Chowmein",
  },

  // Roti / Paratha / Rice
  {
    image: "/img/Plain Paratha.jpeg",
    title: "Plain Paratha",
    price: 20,
    category: "Paratha",
  },
  {
    image: "/img/Naan.jpeg",
    title: "Naan",
    price: 20,
    category: "Paratha",
  },
  {
    image: "/img/Laccha Paratha.jpeg",
    title: "Laccha Paratha",
    price: 25,
    category: "Paratha",
  },
  {
    image: "/img/Rumali Roti.jpeg",
    title: "Rumali Roti",
    price: 20,
    category: "Paratha",
  },
  {
    image: "/img/Basmati Rice.jpeg",
    title: "Basmati Rice",
    price: 50,
    category: "Rice",
  },
  {
    image: "/img/Jeera Rice.jpeg",
    title: "Jeera Rice",
    price: 70,
    category: "Rice",
  },

  // Curry
  {
    image: "/img/Chicken Chaap.jpeg",
    title: "Chicken Chaap",
    price: 120,
    category: "Curry",
  },
  {
    image: "/img/Chicken Kasha.jpeg",
    title: "Chicken Kasha",
    price: 140,
    category: "Curry",
  },
  {
    image: "/img/Chicken Do Pyaza.jpeg",
    title: "Chicken Do Pyaza",
    price: 130,
    category: "Curry",
  },
  {
    image: "/img/Chicken Masala.jpeg",
    title: "Chicken Masala",
    price: 120,
    category: "Curry",
  },
  {
    image: "/img/Egg Curry (2 pcs).jpeg",
    title: "Egg Curry (2 pcs)",
    price: 50,
    category: "Curry",
  },
  {
    image: "/img/Mutton Kasha.jpeg",
    title: "Mutton Kasha",
    price: 180,
    category: "Curry",
  },
  {
    image: "/img/Mutton Do Pyaza.jpeg",
    title: "Mutton Do Pyaza",
    price: 180,
    category: "Curry",
  },
  {
    image: "/img/Mutton Masala.jpeg",
    title: "Mutton Masala",
    price: 200,
    category: "Curry",
  },
  {
    image: "/img/Fish Curry (1 pc).jpeg",
    title: "Fish Curry (1 pc)",
    price: 70,
    category: "Curry",
  },
];

const categories = [
  "All",
  "Thali",
  "Biryani",
  "Roll",
  "Momo",
  "Chowmein",
  "Paratha",
  "Rice",
  "Curry",
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = async (itemTitle, itemPrice) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to add items to cart.");
      return;
    }
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    let cart = [];
    if (userSnap.exists() && userSnap.data().cart) {
      cart = userSnap.data().cart;
    }
    // Check if item already in cart
    const existingItem = cart.find((item) => item.title === itemTitle);
    let newCart;
    if (existingItem) {
      // Increment quantity and total price
      newCart = cart.map((item) =>
        item.title === itemTitle
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + itemPrice,
            }
          : item
      );
    } else {
      // Add new item
      newCart = [...cart, { title: itemTitle, quantity: 1, price: itemPrice }];
    }
    // Calculate total price of all cart items
    const totlePrice = newCart.reduce((sum, item) => sum + item.price, 0);
    // Update both cart and totlePrice in Firestore
    await updateDoc(userRef, { cart: newCart, totlePrice });
    toast("🤤 One item is added !", {
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
  };

  return (
    <div className="bg-[#5b0017] min-h-[100vh] pt-20 text-white md:px-20 px-7">
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
      <style>
        {`
          /* Custom scrollbar for menu grid */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #a0522d #ffd700;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #a0522d;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ffd700;
            border-radius: 8px;
          }
        `}
      </style>
      <Image
        src="/img/pattern.png"
        height={500}
        width={800}
        alt=""
        className=" opacity-100 absolute left-0 top-0  "
      />
      <div className="hero flex items-center justify-between mt-6 md:h-110 h-50">
        <div className="leftPart w-[40%] h-full flex flex-col items-start justify-center md:text-6xl text-2xl md:gap-2 font-serif">
          <span>Discover</span>
          <span>Our menu</span>
        </div>
        <div className="rightPart md:w-[40%] w-[60%] p-2  md:text-xl text-sm font-extralight flex flex-col items-start justify-center gap-4 h-full  ">
          <span>
            There is a wide selection of choices served by top Bengali chefs,
            prepared using best quality local ingredients.
          </span>
        </div>
      </div>
      <div className="py-4">
        <div className="menuBar flex gap-4 md:gap-8 relative z-10 overflow-x-auto ">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-sm text-gray-400/80 md:text-xl ${
                selectedCategory === cat ? "font-bold  text-white" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="my-6 md:my-10 h-100 md:h-150 overflow-y-auto whitespace-nowrap grid md:grid-cols-4 grid-cols-2 gap-6 relative z-10 custom-scrollbar bg-black/10 rounded-2xl px-6 md:py-10 py-4 pb-10">
          {filteredItems.map((item, idx) => (
            <Card
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              contains={item.contains}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
