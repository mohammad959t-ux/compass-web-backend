// اختبار الاتصال بـ MongoDB Atlas
import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mohammad95970:Aoo956930@cluster0.bacz36i.mongodb.net/?retryWrites=true&w=majority";

console.log("🔄 محاولة الاتصال بـ MongoDB Atlas...");
console.log("📍 Connection String:", MONGO_URI.replace(/:[^:@]+@/, ":****@"));

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000
  })
  .then(() => {
    console.log("✅ نجح الاتصال بـ MongoDB Atlas!");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
    console.log("🔗 Ready State:", mongoose.connection.readyState);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ فشل الاتصال بـ MongoDB Atlas");
    console.error("📝 الخطأ:", error.message);
    
    if (error.message.includes("whitelist") || error.message.includes("IP")) {
      console.error("\n⚠️  المشكلة: IP غير مسموح في MongoDB Atlas");
      console.error("\n📋 الحل:");
      console.error("1. افتح: https://cloud.mongodb.com/");
      console.error("2. اختر Cluster → Security → Network Access");
      console.error("3. اضغط 'Add IP Address'");
      console.error("4. اختر 'Allow Access from Anywhere' (0.0.0.0/0)");
      console.error("5. انتظر 1-2 دقيقة");
    }
    
    process.exit(1);
  });
