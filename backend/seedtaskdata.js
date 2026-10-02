const mongoose = require("mongoose");

const user_sign = require("./models/usersign");
const admin_sign = require("./models/adminsign");
const event_Db = require("./models/adminDb");

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error("❌ MONGODB_URL is not defined");
    process.exit(1);
}

async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(MONGODB_URL);

        console.log("✅ MongoDB connected");

        // Remove old CI test data
        await user_sign.deleteMany({
            email: "ciuser@gmail.com"
        });

        await admin_sign.deleteMany({
            email: "ciadmin@gmail.com"
        });

        await event_Db.deleteMany({
            companyName: "CI Test Company"
        });

        // -------------------------
        // CREATE TEST USER
        // -------------------------

        const user = await user_sign.create({
            firstName: "CI",
            lastName: "Test User",
            email: "ciuser@gmail.com",
            password: "Test@123",
            phoneNumber: 9876543210
        });

        console.log("✅ Test user created");

        // -------------------------
        // CREATE TEST ADMIN
        // -------------------------

        const admin = await admin_sign.create({
            firstName: "CI",
            lastName: "Admin",
            email: "ciadmin@gmail.com",
            password: "Admin@123",
            phoneNumber: 9876543211
        });

        console.log("✅ Test admin created");

        // -------------------------
        // CREATE TEST EVENT
        // -------------------------

        await event_Db.create({
            companyName: "CI Test Company",
            location: "Chennai",
            place: "St Joseph",
            date: "2026-10-01",
            volunteer: 10,
            hostId: admin._id.toString(),
            volunteers: []
        });

        console.log("✅ Test event created");

        console.log("================================");
        console.log("✅ DATABASE SEED SUCCESSFUL");
        console.log("================================");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {
        console.error("================================");
        console.error("❌ DATABASE SEED FAILED");
        console.error(error);
        console.error("================================");

        await mongoose.connection.close();

        process.exit(1);
    }
}

seedDatabase();