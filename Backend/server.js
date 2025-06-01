require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const allowedOrigins = [
    "https://restaurant-website-cafediction-cafe-mrkh.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000"   // ✅ add this line
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for this origin: " + origin));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    tableNumber: Number,
    items: [{ name: String, quantity: Number, price: Number }],
    totalPrice: Number,
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    guests: Number
});
const Reservation = mongoose.model("Reservation", reservationSchema);

app.get("/reservations", async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reservations" });
    }
});

app.post("/reservations", async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        if (!name || !email || !phone || !date || !time || !guests) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const newReservation = new Reservation({ name, email, phone, date, time, guests });
        await newReservation.save();
        res.status(201).json({ message: "Reservation successful!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to make reservation" });
    }
});

app.get("/api/booked-dates", async (req, res) => {
    try {
        const bookings = await Reservation.aggregate([
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $match: { count: { $gte: 10 } } }
        ]);
        const fullyBookedDates = bookings.map(b => b._id);
        res.json(fullyBookedDates);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch booked dates" });
    }
});

app.post("/orders", async (req, res) => {
    try {
        const { name, phone, tableNumber, items, totalPrice } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const newOrder = new Order({ name, phone, tableNumber, items, totalPrice });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("❌ Order error:", error);
        res.status(500).json({ message: "Error placing order" });
    }
});

app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

app.get("/", (req, res) => {
    res.send("Cafediction Backend Running.");
});

app.use((req, res) => {
    res.status(404).json({ message: "API route not found", route: req.originalUrl });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
