require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB once
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// CORS setup with allowed origins
const allowedOrigins = [
  "http://localhost:3000", // for development
  "https://restaurant-website-cafediction-cafe-mrkh.vercel.app", // main production link
  "https://restaurant-website-cafediction-git-7eccf0-chandrahass-projects.vercel.app", // preview/staging
  "https://restaurant-website-cafediction-cafe-mrkh-jevav2mrv.vercel.app" // another deployment/preview
];


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS not allowed for this origin: " + origin));
        }
    }
}));

app.use((req, res, next) => {
    console.log("CORS Origin:", req.headers.origin);
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets from /frontend URL path
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Mount auth routes
app.use("/auth", authRoutes);

// Reservation Schema and Model
const reservationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    guests: Number
});
const Reservation = mongoose.model("Reservation", reservationSchema);

// Routes for reservations
app.get("/reservations", async (req, res) => {
    try {
        const reservations = await Reservation.find();
        console.log("Reservations Data:", reservations);
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

        console.log("✅ New Reservation Received:", req.body);

        const newReservation = new Reservation({ name, email, phone, date, time, guests });
        await newReservation.save();

        res.status(201).json({ message: "Reservation successful!" });
    } catch (error) {
        console.error("❌ Error making reservation:", error);
        res.status(500).json({ message: "Failed to make reservation" });
    }
});

// API to get fully booked dates
app.get('/api/booked-dates', async (req, res) => {
    try {
        const bookings = await Reservation.aggregate([
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $match: { count: { $gte: 10 } } } // Replace 10 with your capacity limit
        ]);
        const fullyBookedDates = bookings.map(b => b._id);
        res.json(fullyBookedDates);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch booked dates" });
    }
});

// Order Schema and Model
const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    tableNumber: Number,
    items: [{ name: String, quantity: Number, price: Number }],
    totalPrice: Number,
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// Place an order
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
            tableNumber,
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

// Fetch all orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
});

// Serve frontend HTML on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "API route not found", route: req.originalUrl });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
