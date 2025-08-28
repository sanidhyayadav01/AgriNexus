//just a test file, not intended to be used in main files.

import dotenv from "dotenv";
dotenv.config();

import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendTest() {
  try {
    const result = await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.ADMIN_EMAIL, name: "AgriMitra" },
      to: [{ email: process.env.ADMIN_EMAIL }],
      subject: "Brevo Test ✅",
      htmlContent: "<p>If you see this, Brevo API is working!</p>",
    });
    console.log("✅ Email sent:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

sendTest();
