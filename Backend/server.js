require('dotenv').config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // 👈 Import

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes); // 👈 Mount the routes

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/restaurant", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define Reservation Schema
const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    guests: Number
});

const Reservation = mongoose.model("Reservation", reservationSchema);

// GET route to fetch all reservations
app.get("/reservations", async (req, res) => {
    try {
        const reservations = await Reservation.find();
        console.log("Reservations Data:", reservations); // Log data in VS Code terminal
        res.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: "Error fetching reservations" });
    }
});

app.post("/reservations", async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;

        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: "All fields are required." });
        }

        console.log("✅ New Reservation Received:");
        console.log(req.body); // This will log full data in terminal

        // 👇 This will print data in VS Code terminal
        console.log("✅ New Reservation Received:", req.body);

        const newReservation = new Reservation({ name, email, phone, date, time, guests });
        await newReservation.save();

        res.status(201).json({ message: "Reservation successful!" });
    } catch (error) {
        console.error("❌ Error making reservation:", error);
        res.status(500).json({ message: "Failed to make reservation" });
    }
});

// ✅ API to get fully booked dates (based on reservation count)
app.get('/api/booked-dates', async (req, res) => {
    try {
        const bookings = await Reservation.aggregate([
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $match: { count: { $gte: 10 } } } // we can Replace 10 with our table limit
        ]);
        const fullyBookedDates = bookings.map(b => b._id);
        res.json(fullyBookedDates);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch booked dates" });
    }
});





// ============================
// 📌 ADD ORDER FUNCTIONALITY
// ============================

// Define Order Schema
const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    tableNumber: Number, // 👈 NEW FIELD
    items: [{ name: String, quantity: Number, price: Number }],
    totalPrice: Number,
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// POST route to place an order
app.post("/orders", async (req, res) => {
    try {
        console.log("Backend received body:", req.body);

        const { name, phone, tableNumber, items, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const newOrder = new Order({
            name,
            phone,
            tableNumber, // 👈 Save it
            items,
            totalPrice
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order" });
    }
});


// GET route to fetch all orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});




// ============================
// Start the server
// ============================
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
