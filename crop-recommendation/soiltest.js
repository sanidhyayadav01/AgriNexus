import express from "express";
import mongoose from "mongoose";
import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// --- Soil Test Schema ---
const soilTestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  soilNotes: String,
});

// Prevent OverwriteModelError
const SoilTest =
  mongoose.models.SoilTest || mongoose.model("SoilTest", soilTestSchema);

// --- Brevo API Setup ---
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Soil Test Route
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, soilNotes } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Save in MongoDB
    const newSoilTest = new SoilTest({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      soilNotes,
    });
    await newSoilTest.save();

    if (!process.env.BREVO_API_KEY) {
      console.error("❌ Brevo API key missing. Emails will fail.");
    }
    if (!process.env.ADMIN_EMAIL) {
      console.error("❌ ADMIN_EMAIL missing. Admin notifications will fail.");
    }

    // --- Notification email to ADMIN ---
    try {
      await tranEmailApi.sendTransacEmail({
        sender: { email: process.env.ADMIN_EMAIL, name: "AgriNexus" },
        to: [{ email: process.env.ADMIN_EMAIL }],
        replyTo: { email, name }, //so that admin can reply directly to user
        subject: `Soil Test Request from ${name}`,
        htmlContent: `
          <h3>New Soil Test Request</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Address:</b> ${address}, ${city}, ${state}, ${zip}</p>
          <p><b>Notes:</b> ${soilNotes}</p>
        `,
      });
      console.log("📧 Admin notified about new soil test request.");
    } catch (emailErr) {
      console.error("❌ Failed to send admin email:", emailErr?.response?.body || emailErr.message);
    }

    // --- Confirmation email to USER ---
    try {
      await tranEmailApi.sendTransacEmail({
        sender: { email: process.env.ADMIN_EMAIL, name: "AgriNexus" }, //verified sender
        to: [{ email }],
        subject: "Soil Test Request Received ✅",
        htmlContent: `
          <p>Hi ${name},</p>
          <p>We received your soil test request. We will contact you soon.</p>
          <p>Thank you!<br/>AgriNexus</p>
        `,
      });
      console.log(`📧 Confirmation email sent to ${email}`);
    } catch (emailErr) {
      console.error("❌ Failed to send confirmation email to user:", emailErr?.response?.body || emailErr.message);
    }

    res.status(200).json({ message: "Soil test request submitted successfully!" });
  } catch (error) {
    console.error("❌ Soil test error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
