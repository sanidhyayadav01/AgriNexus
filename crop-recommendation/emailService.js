const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

async function sendEmail(to, subject, htmlContent) {
  try {
    const sender = {
      email: "agrinexus.main@gmail.com", // any email you can use but it must be verified in Brevo
      name: "Crop Recommendation System",
    };

    const receivers = [{ email: to }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent,
    });

    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}

module.exports = sendEmail;
