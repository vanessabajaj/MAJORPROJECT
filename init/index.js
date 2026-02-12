const mongoose = require("mongoose");
const data = require("./data");
const Listing = require("../models/Listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(async ()=>{
    console.log("connected to DB");
    await initDB();
    await mongoose.connection.close();
}).catch((err)=>{
    console.log("error connecting to DB", err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj,owner: "652d0081ae5d37e5b5f"})); 
  await Listing.insertMany(data.data);
  console.log("Database initialized with sample data");
}

