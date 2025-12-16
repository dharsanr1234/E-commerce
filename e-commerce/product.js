// Product List
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics", image: "images/headphones.jpg" },
  { id: 2, name: "Smartphone", price: 14999, category: "Electronics", image: "images/phone.jpg" },
  { id: 3, name: "Running Shoes", price: 2999, category: "Fashion", image: "images/shoes.jpg" },
  { id: 4, name: "T-Shirt", price: 799, category: "Fashion", image: "images/tshirt.jpg" },
  { id: 5, name: "Sofa", price: 12000, category: "Home", image: "images/sofa.jpg" },
  { id: 6, name: "Table Lamp", price: 1500, category: "Home", image: "images/lamp.jpg" },
  { id: 7, name: "Football", price: 999, category: "Sports", image: "images/football.jpg" },
  { id: 8, name: "Badminton Racket", price: 1299, category: "Sports", image: "images/racket.jpg" }
];

// Shared localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
