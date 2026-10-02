const request = require("supertest");
const mongoose = require("mongoose");
const { app, connectDB } = require("../index");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Volunteer Management API", () => {

    // GET ALL EVENTS
    test("GET /events should return all events", async () => {
        const response = await request(app)
            .get("/events");

        expect(response.statusCode).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
    });


    // GET USER DETAILS
    test("GET /userdetails should return users", async () => {
        const response = await request(app)
            .get("/userdetails");

        expect(response.statusCode).toBe(201);
        expect(Array.isArray(response.body)).toBe(true);
    });


    // USER SIGNUP
    test("POST /usersign should create a user", async () => {

        const user = {
            firstName: "Test",
            lastName: "User",
            email: `test${Date.now()}@gmail.com`,
            password: "Test@123",
            phoneNumber: "9876543210"
        };

        const response = await request(app)
            .post("/usersign")
            .send(user);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("isSignup");
    });


    // ADMIN SIGNUP
    test("POST /adminsign should create an admin", async () => {

        const admin = {
            firstName: "Test Admin",
            email: `admin${Date.now()}@gmail.com`,
            password: "Admin@123",
            phoneNumber: "9876543210"
        };

        const response = await request(app)
            .post("/adminsign")
            .send(admin);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("isSignup");
    });


    // CREATE EVENT
    test("POST /admin should create an event", async () => {

        const event = {
            companyName: "Test Company",
            location: "Chennai",
            place: "St Joseph",
            date: "2026-10-01",
            volunteer: 10,
            hostId: "test-host",
            userId: "test-user"
        };

        const response = await request(app)
            .post("/admin")
            .send(event);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("isCreated");
    });

});