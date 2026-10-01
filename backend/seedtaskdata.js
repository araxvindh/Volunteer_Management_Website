const mongoose = require("mongoose");

const User = require("./models/usersign");
const Admin = require("./models/adminsign");
const Event = require("./models/adminDb");

const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/volunteer_management";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");

        // Clear existing test data
        await User.deleteMany({});
        await Admin.deleteMany({});
        await Event.deleteMany({});

        // -----------------------------
        // SEED USER
        // -----------------------------
        const user = await User.create({
            firstName: "CI",
            lastName: "Test User",
            email: "ciuser@gmail.com",
            password: "Test@123",
            phoneNumber: "9876543210"
        });

        console.log("User seeded");

        // -----------------------------
        // SEED ADMIN
        // -----------------------------
        const admin = await Admin.create({
            firstName: "CI Admin",
            email: "ciadmin@gmail.com",
            password: "Admin@123",
            phoneNumber: "9876543211"
        });

        console.log("Admin seeded");

        // -----------------------------
        // SEED EVENTS
        // -----------------------------
        await Event.insertMany([
            {
                companyName: "CI Test Company",
                location: "Chennai",
                place: "St Joseph",
                date: "2026-10-01",
                volunteer: 10,
                hostId: admin._id,
                userId: user._id
            },
            {
                companyName: "Tech Volunteers",
                location: "Chennai",
                place: "Anna Nagar",
                date: "2026-10-05",
                volunteer: 20,
                hostId: admin._id,
                userId: user._id
            }
        ]);

        console.log("Events seeded");

        console.log("✅ Seed data inserted successfully");

        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error("❌ Seed failed:", error);

        await mongoose.connection.close();
        process.exit(1);
    }
};

seedData();