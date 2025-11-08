import { promises as fs } from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://your-mongodb:27017/yourdb';

// --- Product Schema ---
const productSchema = new mongoose.Schema(
  {
    _id: { type: String }, // use string IDs
    id: Number,
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    image_Url: [
      {
        public_id: String,
        url: String,
      },
    ],
    shop: {
      name: String,
      shop_avatar: {
        public_id: String,
        url: String,
      },
      ratings: Number,
    },
    price: Number,
    discount_price: Number,
    rating: Number,
    total_sell: Number,
    stock: Number,
  },
  {
    timestamps: true,
    _id: false,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// --- Migration Function ---
async function migrateData() {
  try {
    console.log('Attempting to connect to MongoDB at:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB');

    // Locate the data file
    const projectRoot = path.resolve(__dirname, '..');
    const dataFile = path.join(projectRoot, 'data', 'Alldata.js');

    // Import the JS file dynamically
    const { productData } = await import(dataFile);

    // Clear existing data
    await Product.deleteMany({});
    console.log('🧹 Cleared existing Product collection');

    // Prepare and insert products
    const usedIds = new Set<string>();
    const products = productData.map((product: any) => {
      let paddedId = product.id.toString().padStart(10, '0');
      while (usedIds.has(paddedId)) {
        const num = parseInt(paddedId) + 1;
        paddedId = num.toString().padStart(10, '0');
      }
      usedIds.add(paddedId);

      return {
        _id: paddedId,
        ...product,
      };
    });

    await Product.insertMany(products);
    console.log(`🚀 Migrated ${products.length} products successfully!`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run migration
migrateData();
