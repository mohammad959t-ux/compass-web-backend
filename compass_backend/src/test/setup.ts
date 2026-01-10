// Set test environment variables BEFORE any imports
process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-key-for-testing-purposes";
process.env.PORT = process.env.PORT || "4000";
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@compass.test";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
process.env.MONGOMS_VERSION = process.env.MONGOMS_VERSION || "6.0.15";
process.env.MONGOMS_DOWNLOAD_TIMEOUT = process.env.MONGOMS_DOWNLOAD_TIMEOUT || "300000";

import mongoose from "mongoose";

type MongoGlobals = typeof globalThis & {
  __mongoServer?: { getUri: () => string; stop: () => Promise<void> };
  __mongoUri?: string;
  __mongoUserCount?: number;
};

const mongoGlobals = globalThis as MongoGlobals;

beforeAll(async () => {
  mongoGlobals.__mongoUserCount = (mongoGlobals.__mongoUserCount ?? 0) + 1;

  // Try to use MongoDB Memory Server if available, otherwise use MONGO_URI
  let mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    try {
      if (!mongoGlobals.__mongoServer) {
        // Try to use MongoDB Memory Server
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        mongoGlobals.__mongoServer = await MongoMemoryServer.create({
          binary: { version: process.env.MONGOMS_VERSION }
        });
        mongoGlobals.__mongoUri = mongoGlobals.__mongoServer.getUri();
        console.log("Using MongoDB Memory Server for testing");
      }
      mongoUri = mongoGlobals.__mongoUri;
    } catch (error) {
      // If MongoDB Memory Server is not available, use default localhost
      mongoUri = "mongodb://localhost:27017/compass_test";
      console.log("MongoDB Memory Server not available, using:", mongoUri);
    }
  }

  process.env.MONGO_URI = mongoUri;

  // Connect to the test database
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000, // Longer timeout for Atlas
        connectTimeoutMS: 15000
      });
      console.log("Connected to test database");
    }
  } catch (error: any) {
    console.error("Failed to connect to test database:", error.message || error);
    
    if (error.message?.includes("whitelist") || error.message?.includes("IP")) {
      console.error("\n⚠️  MongoDB Atlas IP Whitelist Error:");
      console.error("Your IP address is not whitelisted in MongoDB Atlas.");
      console.error("\nTo fix this:");
      console.error("1. Go to: https://cloud.mongodb.com/");
      console.error("2. Select your cluster → Security → Network Access");
      console.error("3. Click 'Add IP Address'");
      console.error("4. Click 'Allow Access from Anywhere' (0.0.0.0/0) for testing");
      console.error("   OR add your current IP address");
      console.error("\nAfter adding your IP, wait 1-2 minutes and try again.");
    } else {
      console.error("\nPlease do one of the following:");
      console.error("1. Start MongoDB locally on port 27017");
      console.error("2. Set MONGO_URI environment variable (e.g., MongoDB Atlas connection string)");
      console.error("3. Install mongodb-memory-server: npm install --save-dev mongodb-memory-server");
    }
    throw error;
  }
}, 300000); // Allow time for MongoDB binary download in tests

afterAll(async () => {
  mongoGlobals.__mongoUserCount = Math.max(0, (mongoGlobals.__mongoUserCount ?? 1) - 1);
  if (mongoGlobals.__mongoUserCount > 0) return;

  // Clean up after all tests
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  // Stop MongoDB Memory Server if it was used
  if (mongoGlobals.__mongoServer) {
    await mongoGlobals.__mongoServer.stop();
    mongoGlobals.__mongoServer = undefined;
    mongoGlobals.__mongoUri = undefined;
  }
});

afterEach(async () => {
  // Clean collections between tests
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
