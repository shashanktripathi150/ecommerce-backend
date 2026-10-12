import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import sampleProducts from './data/products.js';

// Function to import sample data into MongoDB
const importData = async () => {
  try {
    await connectDB();

    // 1. Wipe existing products so we don't have duplicate records
    await Product.deleteMany();
    console.log('Existing products removed.');

    // 2. Insert new sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products successfully imported!');

    process.exit(0);
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Function to wipe out all data from the database
const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('All product data destroyed!');

    process.exit(0);
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Determine action based on terminal flag (-d for destroy)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}