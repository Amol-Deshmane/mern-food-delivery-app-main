import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create an order
router.post("/create-order", async (req, res) => {
    try {
        const { amount, currency = "INR", receipt = "order_receipt_1" } = req.body;

        const options = {
            amount: amount * 100, // Razorpay works in paise (₹1 = 100 paise)
            currency,
            receipt,
            payment_capture: 1,
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Razorpay order creation failed." });
    }
});

// ✅ Verify payment
router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        res.status(500).json({ success: false, message: "Payment verification failed." });
    }
});

export default router;
