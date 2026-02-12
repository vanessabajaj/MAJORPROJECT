const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function seedListings() {
  await mongoose.connect(MONGO_URL);
  
  const sampleListings = [
    {
      title: "Cozy Beach Villa",
      description: "Beautiful villa by the beach with stunning ocean views",
      price: 1200,
      location: "Calangute, Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
    },
    {
      title: "Mountain Cabin",
      description: "Peaceful cabin in the mountains with nature trails",
      price: 800,
      location: "Himachal Pradesh",
      country: "India",
      image: "https://images.unsplash.com/photo-1578037014386-3deaae3c5ce0?w=400&h=300&fit=crop"
    },
    {
      title: "City Apartment",
      description: "Modern apartment in the heart of the city",
      price: 1500,
      location: "Mumbai",
      country: "India",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    }
  ];

  await Listing.insertMany(sampleListings);
  console.log("Sample listings added successfully!");
  mongoose.connection.close();
}

seedListings();
